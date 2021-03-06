"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var common_1 = require('../common');
var NgPreloadCacheHttp = (function (_super) {
    __extends(NgPreloadCacheHttp, _super);
    function NgPreloadCacheHttp(_backend, _defaultOptions) {
        _super.call(this, _backend, _defaultOptions);
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
        this.prime = true;
    }
    NgPreloadCacheHttp.prototype.preload = function (method) {
        var obs = new core_1.EventEmitter(false);
        var newcache = window.ngPreloadCache;
        if (newcache) {
            var preloaded = null;
            var res = void 0;
            preloaded = newcache.shift();
            if (common_1.isPresent(preloaded)) {
                var body = preloaded._body;
                res = new http_1.ResponseOptions(Object.assign({}, preloaded, { body: body }));
                if (preloaded.headers) {
                    res.headers = new http_1.Headers(preloaded);
                }
                preloaded = new http_1.Response(res);
            }
            if (preloaded) {
                obs.next(preloaded);
                obs.complete();
                return obs;
            }
        }
        var request = method();
        request.observer(obs);
        return obs;
    };
    NgPreloadCacheHttp.prototype.request = function (url, options) {
        var _this = this;
        return this.prime ? this.preload(function () { return _super.prototype.request.call(_this, url, options); }) : _super.prototype.request.call(this, url, options);
    };
    NgPreloadCacheHttp.prototype.get = function (url, options) {
        var _this = this;
        return this.prime ? this.preload(function () { return _super.prototype.get.call(_this, url, options); }) : _super.prototype.get.call(this, url, options);
    };
    NgPreloadCacheHttp.prototype.post = function (url, body, options) {
        var _this = this;
        return this.prime ? this.preload(function () { return _super.prototype.post.call(_this, url, body, options); }) : _super.prototype.post.call(this, url, body, options);
    };
    NgPreloadCacheHttp.prototype.put = function (url, body, options) {
        var _this = this;
        return this.prime ? this.preload(function () { return _super.prototype.put.call(_this, url, body, options); }) : _super.prototype.put.call(this, url, body, options);
    };
    NgPreloadCacheHttp.prototype.delete = function (url, options) {
        var _this = this;
        return this.prime ? this.preload(function () { return _super.prototype.delete.call(_this, url, options); }) : _super.prototype.delete.call(this, url, options);
    };
    NgPreloadCacheHttp.prototype.patch = function (url, body, options) {
        var _this = this;
        return this.prime ? this.preload(function () { return _super.prototype.patch.call(_this, url, body, options); }) : _super.prototype.patch.call(this, url, body, options);
    };
    NgPreloadCacheHttp.prototype.head = function (url, options) {
        var _this = this;
        return this.prime ? this.preload(function () { return _super.prototype.head.call(_this, url, options); }) : _super.prototype.head.call(this, url, options);
    };
    NgPreloadCacheHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions])
    ], NgPreloadCacheHttp);
    return NgPreloadCacheHttp;
}(http_1.Http));
exports.NgPreloadCacheHttp = NgPreloadCacheHttp;
exports.NG_PRELOAD_CACHE_PROVIDERS = [
    core_1.provide(http_1.Http, {
        useFactory: function (xhrBackend, requestOptions) {
            return new NgPreloadCacheHttp(xhrBackend, requestOptions);
        },
        deps: [http_1.XHRBackend, http_1.RequestOptions]
    })
];
//# sourceMappingURL=ng_preload_cache.js.map