'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerDependencies = exports.dependencies = exports.registerRule = exports.rulesCollection = exports.formatValidationError = undefined;

var _dependencies2 = require('./dependencies');

Object.defineProperty(exports, 'registerDependencies', {
  enumerable: true,
  get: function get() {
    return _dependencies2.registerDependencies;
  }
});
exports.default = MJMLValidator;

var _lodash = require('lodash');

var _ruleError = require('./rules/ruleError');

var _ruleError2 = _interopRequireDefault(_ruleError);

var _MJMLRulesCollection = require('./MJMLRulesCollection');

var _MJMLRulesCollection2 = _interopRequireDefault(_MJMLRulesCollection);

var _dependencies3 = _interopRequireDefault(_dependencies2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SKIP_ELEMENTS = ['mjml', 'mj-body', 'mj-head'];

var formatValidationError = exports.formatValidationError = _ruleError2.default;

exports.rulesCollection = _MJMLRulesCollection2.default;
exports.registerRule = _MJMLRulesCollection.registerRule;
exports.dependencies = _dependencies3.default;
function MJMLValidator(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = element.children,
      tagName = element.tagName;


  var errors = void 0;

  if (!(0, _lodash.includes)(SKIP_ELEMENTS, tagName)) {
    errors = _lodash.concat.apply(undefined, [errors].concat(_toConsumableArray((0, _lodash.values)(_MJMLRulesCollection2.default).map(function (rule) {
      return rule(element, options);
    }))));
  }

  if (children && children.length > 0) {
    errors = _lodash.concat.apply(undefined, [errors].concat(_toConsumableArray(children.map(function (child) {
      return MJMLValidator(child, options);
    }))));
  }

  return (0, _lodash.filter)(errors);
}