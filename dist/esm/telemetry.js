import { VERSION } from './version.js';
if (typeof process !== 'undefined' && process.env) {
    process.env.NPM_BOX_VERSION = VERSION;
}
if (typeof globalThis !== 'undefined') {
    globalThis.__BOX_PACKAGE_VERSION = VERSION;
}
//# sourceMappingURL=telemetry.js.map