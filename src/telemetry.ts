/**
 * Telemetry initialization for box-node-sdk integration.
 *
 * This module sets environment markers that allow box-node-sdk to detect
 * when it's being used through the box meta-package and append bundle
 * information to the x-box-ua header.
 *
 * Mechanism:
 * - Node.js: Sets process.env.NPM_BOX_VERSION
 * - Browser: Sets globalThis.__BOX_PACKAGE_VERSION
 * - box-node-sdk detects these markers and appends: bundle=box/{version}
 *
 * Header format:
 * Without box package:
 *   x-box-ua: agent=box-node-sdk/10.9.0; env=Node/22.0.0
 *
 * With box package:
 *   x-box-ua: agent=box-node-sdk/10.9.0; env=Node/22.0.0; bundle=box/1.0.0
 *
 * @packageDocumentation
 */

import { VERSION } from './version.js';

// Node.js environment
if (typeof process !== 'undefined' && process.env) {
  process.env.NPM_BOX_VERSION = VERSION;
}

// Browser/Universal environment
if (typeof globalThis !== 'undefined') {
  // eslint-disable-next-line
  (globalThis as any).__BOX_PACKAGE_VERSION = VERSION;
}
