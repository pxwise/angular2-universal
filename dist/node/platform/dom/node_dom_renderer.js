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
var platform_browser_1 = require('@angular/platform-browser');
var dom_renderer_1 = require('@angular/platform-browser/src/dom/dom_renderer');
var web_animations_driver_1 = require('@angular/platform-browser/src/dom/web_animations_driver');
var event_manager_1 = require('@angular/platform-browser/src/dom/events/event_manager');
var shared_styles_host_1 = require('@angular/platform-browser/src/dom/shared_styles_host');
var core_2 = require('@angular/core');
var helper_1 = require('../../helper');
var common_1 = require('../../../common');
require('../../make_parse5_current'); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var DOM = dom_adapter_1.getDOM();
var NodeDomRootRenderer_ = (function (_super) {
    __extends(NodeDomRootRenderer_, _super);
    function NodeDomRootRenderer_(_document, _eventManager, sharedStylesHost, _animate) {
        _super.call(this, _document, _eventManager, sharedStylesHost, _animate);
        this._animate = _animate;
    }
    NodeDomRootRenderer_.prototype.renderComponent = function (componentProto) {
        // TODO(gdi2290): see PR https://github.com/angular/angular/pull/6584
        var renderer = this.registeredComponents.get(componentProto.id);
        if (common_1.isBlank(renderer)) {
            renderer = new NodeDomRenderer(this, componentProto, this._animate);
            this.registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    };
    NodeDomRootRenderer_ = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Object, event_manager_1.EventManager, shared_styles_host_1.DomSharedStylesHost, web_animations_driver_1.WebAnimationsDriver])
    ], NodeDomRootRenderer_);
    return NodeDomRootRenderer_;
}(dom_renderer_1.DomRootRenderer));
exports.NodeDomRootRenderer_ = NodeDomRootRenderer_;
exports.ATTRIBUTES = {
    textarea: [
        'autocapitalize',
        'autocomplete',
        'autofocus',
        'cols',
        'disabled',
        'form',
        'maxlength',
        'minlength',
        'name',
        'placeholder',
        'readonly',
        'required',
        'rows',
        'selectionDirection',
        'selectionEnd',
        'selectionStart',
        'spellcheck',
        'wrap'
    ],
    script: [
        'async',
        'integrity',
        'src',
        'type',
        'text',
        'defer',
        'crossorigin'
    ],
    button: [
        'autofocus',
        'autocomplete',
        'disabled',
        'form',
        'formaction',
        'formenctype',
        'formmethod',
        'formnovalidate',
        'formtarget',
        'name',
        'type',
        'value'
    ],
    fieldset: [
        'disabled',
        'form',
        'name'
    ],
    a: [
        'download',
        'href',
        'hreflang',
        'ping',
        'referrerpolicy',
        'rel',
        'target',
        'type'
    ],
    img: [
        'alt',
        'crossorigin',
        'height',
        'ismap',
        'longdesc',
        'referrerpolicy',
        'sizesHTML5',
        'src',
        'srcsetHTML5',
        'width',
        'usemap'
    ],
    input: [
        'id',
        'type',
        'accept',
        'mozactionhint',
        'autocapitalize',
        'autocomplete',
        'autocorrect',
        'autofocus',
        'autosave',
        'checked',
        'disabled',
        'form',
        'formaction',
        'formenctype',
        'formmethod',
        'formnovalidate',
        'formtarget',
        'height',
        'incremental',
        'inputmode',
        'list',
        'max',
        'maxlength',
        'min',
        'minlength',
        'multiple',
        'name',
        'pattern',
        'placeholder',
        'readonly',
        'required',
        'results',
        'selectionDirection',
        'size',
        'spellcheck',
        'src',
        'step',
        'tabindex',
        'value',
        'width',
        'x-moz-errormessage'
    ],
    output: [
        'for',
        'form',
        'name'
    ],
    progress: [
        'max',
        'value'
    ],
    label: [
        'accesskey',
        'for',
        'form'
    ],
    option: [
        'disabled',
        'label',
        'selected',
        'value'
    ],
    select: [
        'autofocus',
        'disabled',
        'multiple',
        'form',
        'multiple',
        'name',
        'required',
        'size'
    ],
    optgroup: [
        'disabled',
        'label'
    ],
    form: [
        'accept-charset',
        'action',
        'autocapitalize',
        'autocomplete',
        'enctype',
        'method',
        'name',
        'novalidate',
        'target'
    ]
};
// TODO(gdi2290): provide better whitelist above to alias setting props as attrs
exports.IGNORE_ATTRIBUTES = {
    'innerHTML': true
};
var NodeDomRenderer = (function (_super) {
    __extends(NodeDomRenderer, _super);
    function NodeDomRenderer(_rootRenderer, _componentProto, _animate) {
        if (_componentProto.encapsulation === core_2.ViewEncapsulation.Native) {
            _componentProto.encapsulation = core_2.ViewEncapsulation.Emulated;
        }
        _super.call(this, _rootRenderer, _componentProto, _animate);
    }
    NodeDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        var setProp = _super.prototype.setElementProperty.call(this, renderElement, propertyName, propertyValue);
        if (exports.IGNORE_ATTRIBUTES[propertyName]) {
            return setProp;
        }
        var el = DOM.nodeName(renderElement);
        var attrList = exports.ATTRIBUTES[el];
        if (attrList) {
            var booleanAttr = common_1.listContains(attrList, propertyName);
            if (booleanAttr) {
                if (propertyName === 'autocomplete') {
                    return this._setOnOffAttribute(renderElement, propertyName, propertyValue);
                }
                else if (propertyName === 'checked') {
                    return this._setCheckedAttribute(renderElement, propertyName, propertyValue);
                }
                else {
                    return this._setBooleanAttribute(renderElement, propertyName, propertyValue);
                }
            }
        }
        return _super.prototype.setElementAttribute.call(this, renderElement, propertyName, propertyValue);
    };
    NodeDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        var styleNameCased = helper_1.cssHyphenate(styleName);
        return _super.prototype.setElementStyle.call(this, renderElement, styleNameCased, styleValue);
    };
    NodeDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        if (methodName === 'focus') {
            if (DOM.nodeName(renderElement) === 'input') {
                return _super.prototype.setElementAttribute.call(this, renderElement, 'autofocus', '');
            }
        }
        return _super.prototype.invokeElementMethod.call(this, location, methodName, args);
    };
    NodeDomRenderer.prototype._setCheckedAttribute = function (renderElement, propertyName, propertyValue) {
        if (common_1.isPresent(propertyValue)) {
            if (propertyValue === true) {
                return _super.prototype.setElementAttribute.call(this, renderElement, propertyValue, 'checked');
            }
            else if (propertyValue = false) {
                return _super.prototype.setElementAttribute.call(this, renderElement, propertyValue, '');
            }
        }
    };
    NodeDomRenderer.prototype._setOnOffAttribute = function (renderElement, propertyName, propertyValue) {
        if (common_1.isPresent(propertyValue)) {
            if (propertyValue === true) {
                return _super.prototype.setElementAttribute.call(this, renderElement, propertyValue, 'on');
            }
            else if (propertyValue === false) {
                return _super.prototype.setElementAttribute.call(this, renderElement, propertyValue, 'off');
            }
        }
        return _super.prototype.setElementAttribute.call(this, renderElement, propertyName, propertyValue);
    };
    NodeDomRenderer.prototype._setBooleanAttribute = function (renderElement, propertyName, propertyValue) {
        if (common_1.isPresent(propertyValue) && propertyValue !== false) {
            if (propertyValue === true) {
                return _super.prototype.setElementAttribute.call(this, renderElement, propertyName, '');
            }
            else {
                return _super.prototype.setElementAttribute.call(this, renderElement, propertyName, propertyValue);
            }
        }
        return _super.prototype.setElementAttribute.call(this, renderElement, propertyName, propertyValue);
    };
    return NodeDomRenderer;
}(dom_renderer_1.DomRenderer));
exports.NodeDomRenderer = NodeDomRenderer;
//# sourceMappingURL=node_dom_renderer.js.map