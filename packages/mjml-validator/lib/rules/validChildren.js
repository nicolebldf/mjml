'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validChildren;

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _dependencies = require('../dependencies');

var _dependencies2 = _interopRequireDefault(_dependencies);

var _ruleError = require('./ruleError');

var _ruleError2 = _interopRequireDefault(_ruleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validChildren(element, _ref) {
  var components = _ref.components;
  var children = element.children,
      tagName = element.tagName;


  var Component = components[tagName];

  if (!Component) {
    return null;
  }

  if (!children || children.length === 0) {
    return null;
  }

  return (0, _filter2.default)(children.map(function (child) {
    var childTagName = child.tagName;
    var ChildComponent = components[childTagName];
    var parentDependencies = _dependencies2.default[tagName] || [];

    if (!ChildComponent) {
      return null;
    }

    if ((0, _includes2.default)(parentDependencies, childTagName)) {
      return null;
    }

    return (0, _ruleError2.default)(childTagName + ' cannot be used inside ' + tagName + ', only inside: ' + parentDependencies.join(', '), child);
  }));
}
module.exports = exports['default'];