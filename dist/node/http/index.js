"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var nodeHttp = require('./node_http');
var preloadCache = require('./preload_cache');
__export(require('./node_http'));
__export(require('./preload_cache'));
// export var NODE_HTTP_PROVIDERS: Array<any> = [
//   provide(RequestOptions, {useClass: BaseRequestOptions}),
//   provide(ResponseOptions, {useClass: BaseResponseOptions}),
//
//   provide(nodeHttp.NodeBackend, {
//     useFactory: (respOpt, ngZone) => {
//       return new nodeHttp.NodeBackend(respOpt, ngZone);
//     },
//     deps: [ResponseOptions, NgZone]
//   }),
//
//   provide(ConnectionBackend, {useClass: nodeHttp.NodeBackend}),
//   provide(Http, {useClass: Http})
// ];
exports.NODE_HTTP_PROVIDERS_COMMON = [
    core_1.provide(http_1.RequestOptions, { useClass: http_1.BaseRequestOptions }),
    core_1.provide(http_1.ResponseOptions, { useClass: http_1.BaseResponseOptions })
];
exports.NODE_HTTP_PROVIDERS = exports.NODE_HTTP_PROVIDERS_COMMON.concat([
    core_1.provide(http_1.BrowserXhr, { useClass: preloadCache.NodeXhr }),
    // provide(ConnectionBackend, {useClass: preloadCache.NodeXhrBackend}),
    core_1.provide(http_1.ConnectionBackend, { useClass: nodeHttp.NodeBackend }),
    core_1.provide(http_1.Http, { useClass: preloadCache.NgPreloadCacheHttp })
]);
exports.NODE_JSONP_PROVIDERS = exports.NODE_HTTP_PROVIDERS_COMMON.concat([
    core_1.provide(http_1.BrowserXhr, { useClass: preloadCache.NodeXhr }),
    // provide(ConnectionBackend, {useClass: preloadCache.NodeXhrBackend}),
    core_1.provide(http_1.ConnectionBackend, { useClass: nodeHttp.NodeJsonpBackend }),
    core_1.provide(http_1.Jsonp, { useClass: preloadCache.NgPreloadCacheHttp })
]);
exports.HTTP_PROVIDERS = exports.NODE_HTTP_PROVIDERS.concat([
    core_1.provide(core_1.PLATFORM_INITIALIZER, { useValue: function () {
            /* tslint:disable */
            console.warn('DEPRECATION WARNING: `HTTP_PROVIDERS` is no longer supported for `angular2-universal` and will be removed in next release. Please use `NODE_HTTP_PROVIDERS`');
            /* tslint:enable */
        }, multi: true }),
    exports.NODE_HTTP_PROVIDERS
]);
exports.NODE_PRELOAD_CACHE_HTTP_PROVIDERS = exports.NODE_HTTP_PROVIDERS.concat([
    core_1.provide(core_1.PLATFORM_INITIALIZER, { useValue: function () {
            /* tslint:disable */
            console.warn('DEPRECATION WARNING: `NODE_PRELOAD_CACHE_HTTP_PROVIDERS` is no longer supported for `angular2-universal` and will be removed in next release. Please use `NODE_HTTP_PROVIDERS`');
            /* tslint:enable */
        }, multi: true }),
    exports.NODE_HTTP_PROVIDERS
]);
//# sourceMappingURL=index.js.map