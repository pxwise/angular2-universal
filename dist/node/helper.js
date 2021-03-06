"use strict";
var compiler_1 = require('@angular/compiler');
var directiveResolver = new compiler_1.DirectiveResolver();
function serverDirectiveResolver(componentType) {
    return directiveResolver.resolve(componentType);
}
exports.serverDirectiveResolver = serverDirectiveResolver;
function selectorResolver(componentType) {
    return serverDirectiveResolver(componentType).selector;
}
exports.selectorResolver = selectorResolver;
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
exports.escapeRegExp = escapeRegExp;
function stringify(obj, replacer, spaces) {
    if (replacer === void 0) { replacer = null; }
    if (spaces === void 0) { spaces = 2; }
    return JSON.stringify(obj, replacer, spaces);
}
exports.stringify = stringify;
function cssHyphenate(propertyName) {
    return propertyName.replace(/([A-Z])/g, '-$1')
        .replace(/^ms-/, '-ms-') // Internet Explorer vendor prefix.
        .toLowerCase();
}
exports.cssHyphenate = cssHyphenate;
function showDebug(options) {
    if (options === void 0) { options = {}; }
    var info = '\n';
    for (var prop in options) {
        if (prop && options[prop]) {
            info += '' +
                '<pre>' +
                (prop + " = " + stringify(options[prop])) +
                '</pre>';
        }
    }
    return info;
}
exports.showDebug = showDebug;
function stringToBoolean(txt) {
    if (typeof txt !== 'string') {
        return txt;
    }
    switch (txt.toLowerCase()) {
        case 'false':
        case '\'false\'':
        case '"false"':
        case '0':
        case 'no': return false;
        case 'true':
        case '\'true\'':
        case '"true"':
        case '1':
        case 'yes': return true;
        default: return txt;
    }
}
exports.stringToBoolean = stringToBoolean;
function queryParamsToBoolean(query) {
    var obj = {};
    for (var prop in query) {
        if (query.hasOwnProperty(prop)) {
            obj[prop] = stringToBoolean(query[prop]);
        }
    }
    return obj;
}
exports.queryParamsToBoolean = queryParamsToBoolean;
function selectorRegExpFactory(selector) {
    /*
          $1       $2
      <selector> content </selector>
     /<([^\s\>]+)[^>]*>([\s\S]*?)<\/\1>/
    */
    var regExpSelect = "<" + escapeRegExp(selector) + "[^>]*>([\\s\\S]*?)</" + escapeRegExp(selector) + ">";
    return new RegExp(regExpSelect);
}
exports.selectorRegExpFactory = selectorRegExpFactory;
function arrayFlattenTree(children, arr) {
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        arr.push(child.res);
        arrayFlattenTree(child.children, arr);
    }
    return arr;
}
exports.arrayFlattenTree = arrayFlattenTree;
//# sourceMappingURL=helper.js.map