/**
 * Re-export of box-node-sdk with telemetry initialization.
 * Enables tree-shaking when used with modern bundlers.
 *
 * Main exports from the SDK root:
 * - BoxClient: The main Box API client
 * - BoxCcgAuth, CcgConfig: Client Credentials Grant authentication
 * - BoxDeveloperTokenAuth: Developer token authentication
 * - BoxJwtAuth, JwtConfig: JWT authentication
 * - BoxOAuth, OAuthConfig: OAuth 2.0 authentication
 *
 * Additional subpath exports available:
 * - box/sdk/managers: All API managers
 * - box/sdk/schemas: All schema types and serializers
 * - box/sdk/parameters: API parameters and options
 * - box/sdk/networking: Network client and utilities
 * - box/sdk/serialization: Serialization utilities
 * - box/sdk/internal: Internal utilities
 *
 * @packageDocumentation
 */

// Initialize telemetry markers for box-node-sdk to detect bundle usage
import '../telemetry.js';

// Re-export all named exports from box-node-sdk main entry point
export * from 'box-node-sdk';
