'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = skeleton;

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _fonts = require('./fonts');

var _mediaQueries = require('./mediaQueries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function skeleton(options) {
  var _options$breakpoint = options.breakpoint,
      breakpoint = _options$breakpoint === undefined ? '480px' : _options$breakpoint,
      _options$content = options.content,
      content = _options$content === undefined ? '' : _options$content,
      _options$fonts = options.fonts,
      fonts = _options$fonts === undefined ? {} : _options$fonts,
      _options$mediaQueries = options.mediaQueries,
      mediaQueries = _options$mediaQueries === undefined ? {} : _options$mediaQueries,
      preview = options.preview,
      _options$title = options.title,
      title = _options$title === undefined ? '' : _options$title,
      style = options.style,
      forceOWADesktop = options.forceOWADesktop;


  return '\n    <!doctype html>\n    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n      <head>\n        <title>\n          ' + title + '\n        </title>\n        <!--[if !mso]><!-- -->\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <!--<![endif]-->\n        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n        <style type="text/css">\n          #outlook a { padding:0; }\n          .ReadMsgBody { width:100%; }\n          .ExternalClass { width:100%; }\n          .ExternalClass * { line-height:100%; }\n          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }\n          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }\n          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }\n          p { display:block;margin:13px 0; }\n        </style>\n        <!--[if !mso]><!-->\n        <style type="text/css">\n          @media only screen and (max-width:480px) {\n            @-ms-viewport { width:320px; }\n            @viewport { width:320px; }\n          }\n        </style>\n        <!--<![endif]-->\n        <!--[if mso]>\n        <xml>\n        <o:OfficeDocumentSettings>\n          <o:AllowPNG/>\n          <o:PixelsPerInch>96</o:PixelsPerInch>\n        </o:OfficeDocumentSettings>\n        </xml>\n        <![endif]-->\n        <!--[if lte mso 11]>\n        <style type="text/css">\n          .outlook-group-fix { width:100% !important; }\n        </style>\n        <![endif]-->\n        ' + (0, _fonts.buildFontsTags)(content, fonts) + '\n        ' + (0, _mediaQueries.buildMediaQueriesTags)(breakpoint, mediaQueries, forceOWADesktop) + '\n        ' + (style && style.length > 0 ? '<style type="text/css">' + style.join('') + '</style>' : '') + '\n      </head>\n      <body>\n        ' + (0, _preview2.default)(preview) + '\n        ' + content + '\n      </body>\n    </html>\n  ';
}
module.exports = exports['default'];