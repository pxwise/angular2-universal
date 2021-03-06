// typescript does not allow browser/node paths for type definitions
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// TODO(gdi2290): update when typescript allows package forks for universal support
__export(require('./browser/browser'));
// bootstrap exported in both node/browser
var browser_2 = require('./browser/browser');
exports.bootstrap = browser_2.bootstrap;
exports.NgPreloadCacheHttp = browser_2.NgPreloadCacheHttp;
exports.PRIME_CACHE = browser_2.PRIME_CACHE;
exports.isBrowser = browser_2.isBrowser;
exports.isNode = browser_2.isNode;
__export(require('./node/node'));
//# sourceMappingURL=typings.js.map