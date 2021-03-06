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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
var http_1 = require('@angular/http');
// CJS
var xhr2_1 = require('xhr2');
// import XMLHttpRequest = require('xhr2');
var common_1 = require('../../common');
var CONST_EXPR = function (v) { return v; };
function buildBaseUrl(url, existing) {
    var prop = existing ? 'useExisting' : 'useValue';
    return core_1.provide(common_1.BASE_URL, (_a = {}, _a[prop] = url, _a));
    var _a;
}
exports.buildBaseUrl = buildBaseUrl;
var NodeXhrConnection = (function () {
    function NodeXhrConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        this.request = req;
        this.response = new rxjs_1.Observable(function (responseObserver) {
            var _xhr = browserXHR.build();
            _xhr.open(http_1.RequestMethod[req.method].toUpperCase(), req.url);
            // load event handler
            var onLoad = function () {
                // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                // response/responseType properties were introduced in XHR Level2 spec (supported by
                // IE10)
                var response = ('response' in _xhr) ? _xhr.response : _xhr.responseText;
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status = _xhr.status === 1223 ? 204 : _xhr.status;
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = response ? 200 : 0;
                }
                var responseOptions = new http_1.ResponseOptions({ body: response, status: status });
                if (common_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new http_1.Response(responseOptions));
                // TODO(gdi2290): defer complete if array buffer until done
                responseObserver.complete();
            };
            // error event handler
            var onError = function (err) {
                var responseOptions = new http_1.ResponseOptions({ body: err, type: http_1.ResponseType.Error });
                if (common_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new http_1.Response(responseOptions));
            };
            if (common_1.isPresent(req.headers)) {
                req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(_this.request.text());
            return function () {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    return NodeXhrConnection;
}());
exports.NodeXhrConnection = NodeXhrConnection;
var NodeXhr = (function () {
    function NodeXhr(baseUrl) {
        if (common_1.isBlank(baseUrl)) {
            throw new Error('No base url set. Please provide a BASE_URL bindings.');
        }
        this._baseUrl = baseUrl;
    }
    NodeXhr.prototype.build = function () {
        var xhr = new xhr2_1.XMLHttpRequest();
        xhr.nodejsSet({ baseUrl: this._baseUrl });
        return xhr;
    };
    NodeXhr = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(common_1.BASE_URL)), 
        __metadata('design:paramtypes', [String])
    ], NodeXhr);
    return NodeXhr;
}());
exports.NodeXhr = NodeXhr;
var NodeXhrBackend = (function () {
    function NodeXhrBackend(_browserXHR, _baseResponseOptions) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
    }
    NodeXhrBackend.prototype.createConnection = function (request) {
        return new NodeXhrConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    NodeXhrBackend = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.BrowserXhr, http_1.ResponseOptions])
    ], NodeXhrBackend);
    return NodeXhrBackend;
}());
exports.NodeXhrBackend = NodeXhrBackend;
var NgPreloadCacheHttp = (function (_super) {
    __extends(NgPreloadCacheHttp, _super);
    function NgPreloadCacheHttp(_backend, _defaultOptions, _ngZone, prime) {
        _super.call(this, _backend, _defaultOptions);
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
        this._ngZone = _ngZone;
        this.prime = prime;
        this._async = 0;
        this._callId = 0;
        var _rootNode = { children: [], res: null };
        this._rootNode = _rootNode;
        this._activeNode = _rootNode;
    }
    NgPreloadCacheHttp.prototype.preload = function (url, factory) {
        var _this = this;
        var obs = new core_1.EventEmitter(false);
        var currentNode = null;
        if (this.prime) {
            if (common_1.isPresent(this._activeNode)) {
                currentNode = { children: [], res: null };
                this._activeNode.children.push(currentNode);
            }
        }
        // We need this to ensure all ajax calls are done before rendering the app
        this._async += 1;
        var request = factory();
        request
            .subscribe({
            next: function (response) {
                if (_this.prime) {
                    var headers = response.headers.toJSON();
                    // TODO(gdi2290): fix Http to include the url
                    var res = Object.assign({}, response, { headers: headers, url: url });
                    if (common_1.isPresent(currentNode)) {
                        currentNode.res = res;
                    }
                }
                obs.next(response);
            },
            error: function (e) {
                obs.error(e);
                _this._async -= 1;
            },
            complete: function () {
                if (_this.prime) {
                    _this._activeNode = currentNode;
                    _this._activeNode = null;
                }
                obs.complete();
                _this._async -= 1;
            }
        });
        return obs;
    };
    NgPreloadCacheHttp.prototype.request = function (url, options) {
        var _this = this;
        return this.preload(url, function () { return _super.prototype.request.call(_this, url, options); });
    };
    NgPreloadCacheHttp.prototype.get = function (url, options) {
        var _this = this;
        return this.preload(url, function () { return _super.prototype.get.call(_this, url, options); });
    };
    NgPreloadCacheHttp.prototype.post = function (url, body, options) {
        var _this = this;
        return this.preload(url, function () { return _super.prototype.post.call(_this, url, body, options); });
    };
    NgPreloadCacheHttp.prototype.put = function (url, body, options) {
        var _this = this;
        return this.preload(url, function () { return _super.prototype.put.call(_this, url, body, options); });
    };
    NgPreloadCacheHttp.prototype.delete = function (url, options) {
        var _this = this;
        return this.preload(url, function () { return _super.prototype.delete.call(_this, url, options); });
    };
    NgPreloadCacheHttp.prototype.patch = function (url, body, options) {
        var _this = this;
        return this.preload(url, function () { return _super.prototype.patch.call(_this, url, body, options); });
    };
    NgPreloadCacheHttp.prototype.head = function (url, options) {
        var _this = this;
        return this.preload(url, function () { return _super.prototype.head.call(_this, url, options); });
    };
    NgPreloadCacheHttp = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(core_1.NgZone)),
        __param(3, core_1.Optional()),
        __param(3, core_1.Inject(common_1.PRIME_CACHE)), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, core_1.NgZone, Boolean])
    ], NgPreloadCacheHttp);
    return NgPreloadCacheHttp;
}(http_1.Http));
exports.NgPreloadCacheHttp = NgPreloadCacheHttp;
//# sourceMappingURL=preload_cache.js.map