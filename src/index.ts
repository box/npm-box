/**
 * Box - Unified entry point for Box JavaScript/TypeScript development tools
 *
 * This package provides re-exports of official Box libraries.
 * Import specific modules using subpath imports:
 *
 * @example
 * ```typescript
 * // Box SDK (Node.js)
 * import { BoxClient, BoxCcgAuth } from 'box/sdk';
 * import { FilesManager } from 'box/sdk/managers';
 * import { File } from 'box/sdk/schemas';
 *
 * // Box UI Elements (Coming soon)
 * // import { ContentPreview } from 'box/ui-elements';
 * ```
 *
 * @see {@link https://github.com/box/box-node-sdk | Box Node SDK Documentation}
 * @packageDocumentation
 */

/**
 * This is a namespace package. Please use subpath imports:
 * - `box/sdk` - Box Node SDK
 * - `box/sdk/managers` - API managers
 * - `box/sdk/schemas` - Schema types
 * - `box/sdk/parameters` - API parameters
 * - `box/sdk/networking` - Network utilities
 * - `box/sdk/serialization` - Serialization utilities
 *
 * @example
 * ```typescript
 * // ❌ Don't import from root
 * // import something from 'box';
 *
 * // ✅ Use subpath imports
 * import { BoxClient } from 'box/sdk';
 * ```
 */
export const __DO_NOT_IMPORT_FROM_ROOT__ = true;

export type {
  /** Type-only re-export for convenience */
} from 'box-node-sdk';
