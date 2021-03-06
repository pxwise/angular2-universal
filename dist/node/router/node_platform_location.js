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
var common_1 = require('@angular/common');
var nodeUrl = require('url');
var common_2 = require('../../common');
var NodeLocation = (function () {
    function NodeLocation(config) {
        this.assign(config);
    }
    Object.defineProperty(NodeLocation.prototype, "origin", {
        get: function () {
            return this.protocol + '//' + this.hostname + ':' + this.port;
        },
        enumerable: true,
        configurable: true
    });
    NodeLocation.prototype.parse = function (url) {
        return nodeUrl.parse(url);
    };
    NodeLocation.prototype.format = function (obj) {
        return nodeUrl.format(obj);
    };
    NodeLocation.prototype.assign = function (parsed) {
        this.pathname = parsed.pathname || '';
        this.search = parsed.search || '';
        this.hash = parsed.hash || '';
        this.host = parsed.host;
        this.hostname = parsed.hostname;
        this.href = parsed.href;
        this.port = parsed.port;
        this.protocol = parsed.protocol;
        return this;
    };
    NodeLocation.prototype.toJSON = function () {
        var config = {
            hash: this.hash,
            host: this.host,
            hostname: this.hostname,
            href: this.href,
            pathname: this.pathname,
            port: this.port,
            protocol: this.protocol,
            search: this.search
        };
        return config;
    };
    return NodeLocation;
}());
exports.NodeLocation = NodeLocation;
var State = (function () {
    function State(state, title, url) {
        this.state = state;
        this.title = title;
        this.url = url;
    }
    State.prototype.toJSON = function () {
        return {
            state: this.state,
            title: this.title,
            url: this.url
        };
    };
    return State;
}());
exports.State = State;
var PopStateEvent = (function () {
    function PopStateEvent(state) {
        this.state = state;
        this.type = 'popstate';
    }
    PopStateEvent.prototype.toJSON = function () {
        return {
            state: this.state
        };
    };
    return PopStateEvent;
}());
exports.PopStateEvent = PopStateEvent;
var NodePlatformLocation = (function (_super) {
    __extends(NodePlatformLocation, _super);
    function NodePlatformLocation(originUrl, requestUrl, baseUrl) {
        _super.call(this);
        this._stack = [];
        this._stackIndex = -1;
        this._popStateListeners = [];
        this._baseUrl = '/';
        this._originUrl = originUrl;
        this._baseUrl = baseUrl || '/';
        this.pushState(null, null, joinWithSlash(this._baseUrl, requestUrl));
    }
    Object.defineProperty(NodePlatformLocation.prototype, "search", {
        get: function () { return this._loc.search; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodePlatformLocation.prototype, "hash", {
        get: function () { return this._loc.hash; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodePlatformLocation.prototype, "pathname", {
        get: function () { return this._loc.pathname; },
        set: function (newPathname) { this._loc.pathname = newPathname; },
        enumerable: true,
        configurable: true
    });
    NodePlatformLocation.prototype.getBaseHrefFromDOM = function () {
        throw new Error("\n      Attempt to get base href from DOM on the server.\n      You have to provide a value for the APP_BASE_HREF token through DI.\n    ");
    };
    NodePlatformLocation.prototype.getBaseHref = function () { return this._baseUrl; };
    NodePlatformLocation.prototype.path = function () { return this._loc.pathname; };
    NodePlatformLocation.prototype.pushState = function (state, title, url) {
        this._stack.push(new State(state, title, url));
        this._stackIndex++;
        this._updateLocation();
    };
    NodePlatformLocation.prototype.replaceState = function (state, title, url) {
        this._stack[this._stackIndex] = new State(state, title, url);
        this._updateLocation();
    };
    NodePlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
    NodePlatformLocation.prototype.onHashChange = function (fn) { };
    NodePlatformLocation.prototype.back = function () {
        if (this._stackIndex === 0) {
            return;
        }
        this._stackIndex--;
        this._updateLocation();
        this._callPopStateListeners();
    };
    NodePlatformLocation.prototype.forward = function () {
        if (this._stackIndex === this._stack.length - 1) {
            return;
        }
        this._stackIndex++;
        this._updateLocation();
        this._callPopStateListeners();
    };
    NodePlatformLocation.prototype.prepareExternalUrl = function (internal) {
        return joinWithSlash(this._baseUrl, internal);
    };
    NodePlatformLocation.prototype.toJSON = function () {
        return {
            location: this._loc,
            stack: this._stack,
            stackIndex: this._stackIndex,
            popStateListeners: this._popStateListeners,
            baseHref: this._baseUrl
        };
    };
    NodePlatformLocation.prototype._updateLocation = function () {
        var state = this._stack[this._stackIndex];
        var url = state.url;
        this._setLocationByUrl(url);
    };
    NodePlatformLocation.prototype._setLocationByUrl = function (url) {
        var resolvedOriginBase = nodeUrl.resolve(this._originUrl, this._baseUrl);
        var resolvedWithUrl = nodeUrl.resolve(resolvedOriginBase, url);
        var nodeLocation = nodeUrl.parse(resolvedWithUrl);
        this._loc = new NodeLocation(nodeLocation);
    };
    NodePlatformLocation.prototype._callPopStateListeners = function () {
        var state = this._stack[this._stackIndex].state;
        var event = new PopStateEvent(state);
        // Actually listeners should be called asynchronously,
        // But right now I don't know what is better for a server side.
        this._popStateListeners.forEach(function (listener) { return listener(event); });
    };
    NodePlatformLocation = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(common_2.ORIGIN_URL)),
        __param(1, core_1.Inject(common_2.REQUEST_URL)),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(common_2.BASE_URL)), 
        __metadata('design:paramtypes', [String, String, String])
    ], NodePlatformLocation);
    return NodePlatformLocation;
}(common_1.PlatformLocation));
exports.NodePlatformLocation = NodePlatformLocation;
function joinWithSlash(start, end) {
    if (start.length === 0) {
        return end;
    }
    if (end.length === 0) {
        return start;
    }
    var slashes = 0;
    if (start.endsWith('/')) {
        slashes++;
    }
    if (end.startsWith('/')) {
        slashes++;
    }
    if (slashes === 2) {
        return start + end.substring(1);
    }
    if (slashes === 1) {
        return start + end;
    }
    return start + '/' + end;
}
exports.joinWithSlash = joinWithSlash;
//# sourceMappingURL=node_platform_location.js.map