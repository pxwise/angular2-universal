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
var core_1 = require('@angular/core');
var shared_styles_host_1 = require('@angular/platform-browser/src/dom/shared_styles_host');
require('../make_parse5_current'); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var DOM = dom_adapter_1.getDOM();
var NodeSharedStylesHost = (function (_super) {
    __extends(NodeSharedStylesHost, _super);
    function NodeSharedStylesHost() {
        _super.call(this);
        this._hostNodes = new Set();
    }
    /** @internal */
    NodeSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            DOM.appendChild(host, DOM.createStyleElement(style));
        }
    };
    NodeSharedStylesHost.prototype.addHost = function (hostNode) {
        this._addStylesToHost(this._styles, hostNode);
        this._hostNodes.add(hostNode);
    };
    NodeSharedStylesHost.prototype.removeHost = function (hostNode) {
        this._hostNodes.delete(hostNode);
    };
    NodeSharedStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        this._hostNodes.forEach(function (hostNode) {
            _this._addStylesToHost(additions, hostNode);
        });
    };
    NodeSharedStylesHost = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NodeSharedStylesHost);
    return NodeSharedStylesHost;
}(shared_styles_host_1.SharedStylesHost));
exports.NodeSharedStylesHost = NodeSharedStylesHost;
//# sourceMappingURL=node_shared_styles_host.js.map