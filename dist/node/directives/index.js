"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var node_form_1 = require('./node_form');
var node_universal_styles_1 = require('./node_universal_styles');
var core_1 = require('@angular/core');
__export(require('./node_form'));
exports.NODE_FORM_DIRECTIVES = [
    node_form_1.NodeForm
];
exports.NODE_DIRECTIVES = [
    node_universal_styles_1.NodeUniversalStyles
];
exports.NODE_PLATFORM_DIRECTIVES = (core_1.PLATFORM_DIRECTIVES ? [{ provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.NODE_DIRECTIVES }] : []).slice();
//# sourceMappingURL=index.js.map