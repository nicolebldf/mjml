'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = MJMLParser;

var _htmlparser = require('htmlparser2');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _findLastIndex = require('lodash/findLastIndex');

var _findLastIndex2 = _interopRequireDefault(_findLastIndex);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _filter = require('lodash/fp/filter');

var _filter2 = _interopRequireDefault(_filter);

var _map = require('lodash/fp/map');

var _map2 = _interopRequireDefault(_map);

var _flow = require('lodash/fp/flow');

var _flow2 = _interopRequireDefault(_flow);

var _parseAttributes = require('./helpers/parseAttributes');

var _parseAttributes2 = _interopRequireDefault(_parseAttributes);

var _cleanNode = require('./helpers/cleanNode');

var _cleanNode2 = _interopRequireDefault(_cleanNode);

var _convertBooleansOnAttrs = require('./helpers/convertBooleansOnAttrs');

var _convertBooleansOnAttrs2 = _interopRequireDefault(_convertBooleansOnAttrs);

var _addCDATASection = require('./helpers/addCDATASection');

var _addCDATASection2 = _interopRequireDefault(_addCDATASection);

var _setEmptyAttributes = require('./helpers/setEmptyAttributes');

var _setEmptyAttributes2 = _interopRequireDefault(_setEmptyAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var indexesForNewLine = function indexesForNewLine(xml) {
  var regex = /\n/gi;
  var indexes = [0];

  while (regex.exec(xml)) {
    indexes.push(regex.lastIndex);
  }

  return indexes;
};

function MJMLParser(xml) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$addEmptyAttr = options.addEmptyAttributes,
      addEmptyAttributes = _options$addEmptyAttr === undefined ? true : _options$addEmptyAttr,
      _options$components = options.components,
      components = _options$components === undefined ? {} : _options$components,
      _options$convertBoole = options.convertBooleans,
      convertBooleans = _options$convertBoole === undefined ? true : _options$convertBoole,
      _options$keepComments = options.keepComments,
      keepComments = _options$keepComments === undefined ? true : _options$keepComments,
      _options$filePath = options.filePath,
      filePath = _options$filePath === undefined ? '.' : _options$filePath;


  var CDATASections = (0, _flow2.default)((0, _filter2.default)(function (component) {
    return component.endingTag;
  }), (0, _map2.default)(function (component) {
    return component.getTagName();
  }))(_extends({}, components));

  var cwd = filePath ? _path2.default.dirname(filePath) : process.cwd();

  var safeXml = xml;

  safeXml = (0, _parseAttributes2.default)(safeXml);
  safeXml = (0, _addCDATASection2.default)(CDATASections, safeXml);

  var mjml = null;
  var cur = null;
  var inInclude = false;

  var findTag = function findTag(tagName, tree) {
    return (0, _find2.default)(tree.children, { tagName: tagName });
  };
  var lineIndexes = indexesForNewLine(safeXml);
  var handleInclude = function handleInclude(file, line) {
    var partialPath = _path2.default.resolve(cwd, file);
    var content = void 0;

    try {
      content = _fs2.default.readFileSync(partialPath, 'utf8');
    } catch (e) {
      var newNode = {
        line: line,
        file: file,
        absoluteFilePath: _path2.default.resolve(cwd, filePath),
        parent: cur,
        tagName: 'mj-raw',
        content: '<!-- mj-include fails with file : ' + file + ' at ' + partialPath + ' -->',
        children: []
      };

      cur.children.push(newNode);
      cur = newNode;

      return;
    }

    content = content.indexOf('<mjml>') === -1 ? '<mjml><mj-body>' + content + '</mj-body></mjml>' : content;

    var partialMjml = MJMLParser(content, _extends({}, options, {
      filePath: partialPath
    }));
    var bindToTree = function bindToTree(children) {
      var tree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cur;
      return children.map(function (c) {
        return _extends({}, c, { parent: tree });
      });
    };

    if (partialMjml.tagName !== 'mjml') {
      return;
    }

    var body = findTag('mj-body', partialMjml);
    var head = findTag('mj-head', partialMjml);

    if (body) {
      cur.children = [].concat(_toConsumableArray(cur.children), _toConsumableArray(bindToTree(body.children)));
    }

    if (head) {
      var curHead = findTag('mj-head', mjml);

      if (!curHead) {
        mjml.children.push({
          file: filePath,
          absoluteFilePath: _path2.default.resolve(cwd, filePath),
          parent: mjml,
          tagName: 'mj-head',
          children: []
        });

        curHead = findTag('mj-head', mjml);
      }

      curHead.children = [].concat(_toConsumableArray(curHead.children), _toConsumableArray(bindToTree(head.children, curHead)));
    }
  };

  var parser = new _htmlparser2.default.Parser({
    onopentag: function onopentag(name, attrs) {
      // eslint-disable-line consistent-return
      var line = (0, _findLastIndex2.default)(lineIndexes, function (i) {
        return i <= parser.startIndex;
      }) + 1;

      if (name === 'mj-include') {
        inInclude = true;

        return handleInclude(decodeURIComponent(attrs.path), line);
      }

      if (convertBooleans) {
        // "true" and "false" will be converted to bools
        attrs = (0, _convertBooleansOnAttrs2.default)(attrs);
      }

      attrs = (0, _mapValues2.default)(attrs, function (val) {
        return decodeURIComponent(val);
      });

      var newNode = {
        file: filePath,
        absoluteFilePath: _path2.default.resolve(cwd, filePath),
        line: line,
        parent: cur,
        tagName: name,
        attributes: attrs,
        children: []
      };

      if (cur) {
        cur.children.push(newNode);
      } else {
        mjml = newNode;
      }

      cur = newNode;
    },
    onclosetag: function onclosetag() {
      if (inInclude) {
        inInclude = false;
        return;
      }

      cur = cur && cur.parent || null;
    },
    ontext: function ontext(text) {
      if (!text) {
        return;
      }

      var val = ('' + (cur && cur.content || '') + text).trim();

      if (val) {
        cur.content = (0, _parseAttributes.decodeAttributes)(val);
      }
    },
    oncomment: function oncomment(data) {
      if (cur && keepComments) {
        cur.children.push({
          line: (0, _findLastIndex2.default)(lineIndexes, function (i) {
            return i <= parser.startIndex;
          }) + 1,
          tagName: 'mj-raw',
          content: '<!-- ' + data.trim() + ' -->'
        });
      }
    }
  }, {
    xmlMode: true
  });

  parser.write(safeXml);
  parser.end();

  if (!(0, _isObject2.default)(mjml)) {
    throw new Error('Parsing failed. Check your mjml.');
  }

  (0, _cleanNode2.default)(mjml);

  // Assign "attributes" property if not set
  if (addEmptyAttributes) {
    (0, _setEmptyAttributes2.default)(mjml);
  }

  return mjml;
}
module.exports = exports['default'];