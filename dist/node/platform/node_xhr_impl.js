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
var http = require('http');
var url = require('url');
var fs = require('fs');
var common_1 = require('../../common');
var core_1 = require('@angular/core');
var compiler_1 = require('@angular/compiler');
var NodeXHRImpl = (function (_super) {
    __extends(NodeXHRImpl, _super);
    function NodeXHRImpl(ngZone, _originUrl, _baseUrl) {
        if (_originUrl === void 0) { _originUrl = ''; }
        _super.call(this);
        this.ngZone = ngZone;
        this._originUrl = _originUrl;
        this._baseUrl = _baseUrl || '/';
    }
    NodeXHRImpl.prototype.get = function (templateUrl) {
        var _this = this;
        var parsedUrl = url.parse(url.resolve(url.resolve(this._originUrl, this._baseUrl), templateUrl));
        return new Promise(function (resolve, reject) {
            if (parsedUrl.protocol === 'file:') {
                // TODO(jeffbcross): is this promise already zone-aware/patched?
                _this.ngZone.run(function () {
                    fs.readFile(parsedUrl.path, function (err, data) {
                        if (err) {
                            return reject("Failed to load " + templateUrl + " with error " + err);
                        }
                        _this.ngZone.run(function () {
                            resolve(data.toString());
                        });
                    });
                });
            }
            else {
                _this.ngZone.run(function () {
                    http.get(parsedUrl, function (res) {
                        res.setEncoding('utf8');
                        var status = res.statusCode;
                        if (200 <= status && status <= 300) {
                            var data_1 = '';
                            res.on('data', function (chunk) {
                                data_1 += chunk;
                            });
                            res.on('end', function () {
                                _this.ngZone.run(function () {
                                    resolve(data_1);
                                });
                            });
                        }
                        else {
                            _this.ngZone.run(function () {
                                reject("Failed to load " + templateUrl);
                            });
                        }
                        // consume response body
                        res.resume();
                    }).on('error', function (e) {
                        _this.ngZone.run(function () {
                            reject("Failed to load " + templateUrl);
                        });
                    });
                });
            }
        });
    };
    NodeXHRImpl = __decorate([
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(common_1.ORIGIN_URL)),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(common_1.BASE_URL)), 
        __metadata('design:paramtypes', [core_1.NgZone, String, String])
    ], NodeXHRImpl);
    return NodeXHRImpl;
}(compiler_1.XHR));
exports.NodeXHRImpl = NodeXHRImpl;
//# sourceMappingURL=node_xhr_impl.js.map