'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _mjmlCore = require('mjml-core');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MjPreview = (_temp = _class = function (_HeadComponent) {
  _inherits(MjPreview, _HeadComponent);

  function MjPreview() {
    _classCallCheck(this, MjPreview);

    return _possibleConstructorReturn(this, (MjPreview.__proto__ || Object.getPrototypeOf(MjPreview)).apply(this, arguments));
  }

  _createClass(MjPreview, [{
    key: 'handler',
    value: function handler() {
      var add = this.context.add;


      add('preview', this.getContent());
    }
  }]);

  return MjPreview;
}(_mjmlCore.HeadComponent), _class.endingTag = true, _temp);
exports.default = MjPreview;
module.exports = exports['default'];