"use strict";
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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var http = require('http');
var https = require('https');
var url = require('url');
var common_1 = require('../../common');
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
var NodeConnection = (function () {
    function NodeConnection(req, baseResponseOptions, ngZone, originUrl, baseUrl, cookie, cookieKey) {
        if (originUrl === void 0) { originUrl = ''; }
        this.request = req;
        cookieKey = cookieKey || 'universal_angular2';
        baseUrl = baseUrl || '/';
        if (originUrl === null) {
            throw new Error('ERROR: Please move ORIGIN_URL to platformProviders');
        }
        var _reqInfo = url.parse(url.resolve(url.resolve(originUrl, baseUrl), req.url));
        _reqInfo.method = http_1.RequestMethod[req.method].toUpperCase();
        if (common_1.isPresent(cookie)) {
            if (!common_1.isPresent(req.headers)) {
                req.headers = new http_1.Headers();
            }
            var cookieValue = void 0;
            try {
                cookieValue = cookie.get(cookieKey);
            }
            catch (e) { }
            if (cookieValue) {
                req.headers.append('Cookie', cookieValue);
            }
        }
        if (common_1.isPresent(req.headers)) {
            _reqInfo.headers = {};
            req.headers.forEach(function (values, name) { return _reqInfo.headers[name] = values.join(','); });
        }
        _reqInfo.headers = _reqInfo.headers || {};
        // needed for node xhrs
        _reqInfo.headers['User-Agent'] = _reqInfo.headers['User-Agent'] || 'Angular 2 Universal';
        this.response = new Observable_1.Observable(function (responseObserver) {
            var nodeReq;
            ngZone.run(function () {
                // http or https
                var xhrHttp = http;
                if (_reqInfo.protocol === 'https:') {
                    xhrHttp = https;
                }
                nodeReq = xhrHttp.request(_reqInfo, function (res) {
                    var body = '';
                    res.on('data', function (chunk) { return body += chunk; });
                    var status = res.statusCode;
                    var headers = new http_1.Headers(res.headers);
                    var url = res.url;
                    res.on('end', function () {
                        var responseOptions = new http_1.ResponseOptions({ body: body, status: status, headers: headers, url: url });
                        var response = new http_1.Response(responseOptions);
                        if (common_1.isSuccess(status)) {
                            ngZone.run(function () {
                                responseObserver.next(response);
                            });
                            ngZone.run(function () {
                                responseObserver.complete();
                            });
                            return;
                        }
                        ngZone.run(function () {
                            responseObserver.error(response);
                        });
                    });
                });
            });
            var onError = function (err) {
                var responseOptions = new http_1.ResponseOptions({ body: err, type: http_1.ResponseType.Error });
                if (common_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                ngZone.run(function () {
                    responseObserver.error(new http_1.Response(responseOptions));
                });
            };
            nodeReq.on('error', onError);
            nodeReq.write(req.text());
            nodeReq.end();
            return function () {
                nodeReq.removeListener('error', onError);
                nodeReq.abort();
            };
        });
    }
    NodeConnection = __decorate([
        __param(3, core_1.Inject(common_1.ORIGIN_URL)),
        __param(4, core_1.Optional()),
        __param(4, core_1.Inject(common_1.BASE_URL)),
        __param(5, core_1.Optional()),
        __param(5, core_1.Inject(common_1.Cookie)),
        __param(6, core_1.Optional()),
        __param(6, core_1.Inject(common_1.COOKIE_KEY)), 
        __metadata('design:paramtypes', [http_1.Request, http_1.ResponseOptions, core_1.NgZone, String, String, common_1.Cookie, Object])
    ], NodeConnection);
    return NodeConnection;
}());
exports.NodeConnection = NodeConnection;
var NodeJSONPConnection = (function () {
    function NodeJSONPConnection(req, baseResponseOptions, ngZone, originUrl, baseUrl) {
        if (originUrl === void 0) { originUrl = ''; }
        if (req.method !== http_1.RequestMethod.Get) {
            throw new TypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        baseUrl = baseUrl || '/';
        if (originUrl === null) {
            throw new Error('ERROR: Please move ORIGIN_URL to platformProviders');
        }
        var _reqInfo = url.parse(url.resolve(url.resolve(originUrl, baseUrl), req.url));
        _reqInfo.method = http_1.RequestMethod[req.method].toUpperCase();
        if (common_1.isPresent(req.headers)) {
            _reqInfo.headers = {};
            req.headers.forEach(function (values, name) { return _reqInfo.headers[name] = values.join(','); });
        }
        _reqInfo.headers = _reqInfo.headers || {};
        // needed for node jsonp xhrs
        _reqInfo.headers['User-Agent'] = _reqInfo.headers['User-Agent'] || 'Angular 2 Universal';
        this.response = new Observable_1.Observable(function (responseObserver) {
            var nodeReq;
            ngZone.run(function () {
                // http or https
                var xhrHttp = http;
                if (_reqInfo.protocol === 'https:') {
                    xhrHttp = https;
                }
                nodeReq = xhrHttp.request(_reqInfo, function (res) {
                    var body = '';
                    res.on('data', function (chunk) { return body += chunk; });
                    var status = res.statusCode;
                    var headers = new http_1.Headers(res.headers);
                    var url = res.url;
                    res.on('end', function () {
                        var responseJson;
                        try {
                            var responseFactory = new Function('JSON_CALLBACK', body);
                            responseFactory(function (json) {
                                responseJson = json;
                            });
                        }
                        catch (e) {
                            console.log('JSONP Error:', e);
                            throw e;
                        }
                        var responseOptions = new http_1.ResponseOptions({ body: responseJson, status: status, headers: headers, url: url });
                        var response = new http_1.Response(responseOptions);
                        if (common_1.isSuccess(status)) {
                            ngZone.run(function () {
                                responseObserver.next(response);
                            });
                            ngZone.run(function () {
                                responseObserver.complete();
                            });
                            return;
                        }
                        ngZone.run(function () {
                            responseObserver.error(response);
                        });
                    });
                });
            });
            var onError = function (err) {
                var responseOptions = new http_1.ResponseOptions({ body: err, type: http_1.ResponseType.Error });
                if (common_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                ngZone.run(function () {
                    responseObserver.error(new http_1.Response(responseOptions));
                });
            };
            nodeReq.on('error', onError);
            nodeReq.write(req.text());
            nodeReq.end();
            return function () {
                nodeReq.removeListener('error', onError);
                nodeReq.abort();
            };
        });
    }
    NodeJSONPConnection = __decorate([
        __param(3, core_1.Optional()),
        __param(3, core_1.Inject(common_1.ORIGIN_URL)),
        __param(4, core_1.Optional()),
        __param(4, core_1.Inject(common_1.BASE_URL)), 
        __metadata('design:paramtypes', [http_1.Request, http_1.ResponseOptions, core_1.NgZone, String, String])
    ], NodeJSONPConnection);
    return NodeJSONPConnection;
}());
var NodeBackend = (function () {
    function NodeBackend(_baseResponseOptions, _ngZone, _baseUrl, _originUrl) {
        this._baseResponseOptions = _baseResponseOptions;
        this._ngZone = _ngZone;
        this._baseUrl = _baseUrl;
        this._originUrl = _originUrl;
    }
    NodeBackend.prototype.createConnection = function (request) {
        return new NodeConnection(request, this._baseResponseOptions, this._ngZone, this._baseUrl, this._originUrl);
    };
    NodeBackend = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(common_1.BASE_URL)),
        __param(3, core_1.Inject(common_1.ORIGIN_URL)), 
        __metadata('design:paramtypes', [http_1.ResponseOptions, core_1.NgZone, String, String])
    ], NodeBackend);
    return NodeBackend;
}());
exports.NodeBackend = NodeBackend;
var NodeJsonpBackend = (function () {
    function NodeJsonpBackend(_baseResponseOptions, _ngZone, _baseUrl, _originUrl) {
        this._baseResponseOptions = _baseResponseOptions;
        this._ngZone = _ngZone;
        this._baseUrl = _baseUrl;
        this._originUrl = _originUrl;
    }
    NodeJsonpBackend.prototype.createConnection = function (request) {
        return new NodeJSONPConnection(request, this._baseResponseOptions, this._ngZone, this._baseUrl, this._originUrl);
    };
    NodeJsonpBackend = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(common_1.BASE_URL)),
        __param(3, core_1.Inject(common_1.ORIGIN_URL)), 
        __metadata('design:paramtypes', [http_1.ResponseOptions, core_1.NgZone, String, String])
    ], NodeJsonpBackend);
    return NodeJsonpBackend;
}());
exports.NodeJsonpBackend = NodeJsonpBackend;
//# sourceMappingURL=node_http.js.map