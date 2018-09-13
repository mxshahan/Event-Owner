'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
function normalizeAssets(assets) {
  return Array.isArray(assets) ? assets : [assets];
}

var serverRender = function serverRender(req, res) {
  var assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
  res.send('\n  <html>\n    <head>\n      <title>Shahan Event Owner</title>\n          ' + normalizeAssets(assetsByChunkName.main).filter(function (path) {
    return path.endsWith('.css');
  }).map(function (path) {
    return '<link rel="stylesheet" href="' + path + '" />';
  }).join('\n') + '\n    </head>\n    <body>\n      <div id="root"></div>\n          ' + normalizeAssets(assetsByChunkName.main).filter(function (path) {
    return path.endsWith('.js');
  }).map(function (path) {
    return '<script src="' + path + '"></script>';
  }).join('\n') + '\n    </body>\n  </html>\n    ');
};

exports.default = serverRender;