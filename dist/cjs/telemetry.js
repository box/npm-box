"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_js_1 = require("./version.js");
if (typeof process !== 'undefined' && process.env) {
    process.env.NPM_BOX_VERSION = version_js_1.VERSION;
}
if (typeof globalThis !== 'undefined') {
    globalThis.__BOX_PACKAGE_VERSION = version_js_1.VERSION;
}
//# sourceMappingURL=telemetry.js.map