# Box

Unified entry point for Box JavaScript/TypeScript development tools - SDK and CLI.

## Installation

```bash
npm install box
```

## Usage

This is a **namespace package**. Import specific modules using subpath imports:

### Box SDK (Node.js)

```typescript
// Main SDK exports
import { BoxClient, BoxCcgAuth, BoxJwtAuth } from 'box/sdk';

// API Managers
import { FilesManager, FoldersManager } from 'box/sdk/managers';

// Schema types
import { File, Folder } from 'box/sdk/schemas';

// API parameters
import { GetFileByIdParams } from 'box/sdk/parameters';

// Network utilities
import { NetworkSession } from 'box/sdk/networking';

// Serialization utilities
import { serializeDateTime } from 'box/sdk/serialization';
```

### ❌ Don't Import from Root

```typescript
// ❌ This won't work - root has no exports
import something from 'box';

// ✅ Use subpath imports instead
import { BoxClient } from 'box/sdk';
```

## Available Subpaths

| Subpath | Description |
|---------|-------------|
| `box/sdk` | Main Box Node SDK - client and authentication |
| `box/sdk/managers` | All API resource managers (Files, Folders, Users, etc.) |
| `box/sdk/schemas` | TypeScript types and schema definitions |
| `box/sdk/parameters` | API method parameters and options |
| `box/sdk/networking` | Network client and session management |
| `box/sdk/serialization` | Serialization and deserialization utilities |
| `box/sdk/internal` | Internal utilities (advanced use) |

## CLI Tool

This package also includes the Box CLI:

```bash
npx box --help
```

## Requirements

- **Node.js**: 22.0.0 or higher
- **TypeScript**: 5.0 or higher (optional)

## Features

- ✅ **Dual ESM/CJS support** - Works with both `import` and `require()`
- ✅ **Full TypeScript support** - Complete type definitions
- ✅ **Tree-shaking compatible** - Only bundle what you use
- ✅ **Browser compatible** - ESM builds work in modern browsers
- ✅ **Zero runtime overhead** - Pure re-exports of official packages

## Documentation

- [Box Node SDK Documentation](https://github.com/box/box-node-sdk)
- [Box Platform API Reference](https://developer.box.com/reference/)
- [Box CLI Documentation](https://github.com/box/boxcli)

## License

Apache-2.0

## Support

- [GitHub Issues](https://github.com/box/box-npm/issues)
- [Box Developer Forum](https://forum.box.com/)
