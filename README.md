<p align="center">
  <img src="https://github.com/box/sdks/blob/master/images/box-dev-logo.png" alt= "box-dev-logo" width="30%" height="50%">
</p>

# Box

[![Project Status](http://opensource.box.com/badges/active.svg)](http://opensource.box.com/badges)
![build](https://github.com/box/npm-box/actions/workflows/ci.yml/badge.svg)
[![npm version](https://badge.fury.io/js/box.svg)](https://badge.fury.io/js/box)
[![image](https://img.shields.io/npm/dm/box.svg)](https://badge.fury.io/js/box)
![Platform](https://img.shields.io/badge/node-%3E%3D22-blue)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)

Curated meta-package for building on Box with JavaScript and TypeScript: one install surface anchored on the official SDK (and CLI), structured so additional Box developer tools can ship here over time.

> **For AI Agents & LLMs**: See [`llms.txt`](./llms.txt) for complete usage guide.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Box](#box)
  - [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
    - [Import from `box`](#import-from-box)
    - [Box SDK (Node.js)](#box-sdk-nodejs)
  - [CLI Tool](#cli-tool)
  - [Requirements](#requirements)
  - [Features](#features)
  - [Documentation](#documentation)
- [Contributing](#contributing)
- [Questions, Bugs, and Feature Requests?](#questions-bugs-and-feature-requests)
- [Copyright and License](#copyright-and-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Add the `box` package to your project to use the [Box SDK](#box-sdk-nodejs) via subpath imports and the [`box` CLI](#cli-tool). Pick the command for your package manager:

**npm**

```bash
npm install box
```

**Yarn**

```bash
yarn add box
```

## Prerequisites

Before using this package, you need:

1. **A Box account** - If you don't have one, you can create a free developer account at [developer.box.com](https://developer.box.com/)
2. **A Box Platform App** - Create one at [Box Developer Console](https://app.box.com/developers/console)
3. **Authentication credentials** - Choose based on use case:
   - **Developer Token**: Quick testing (expires in 60 minutes) - Generate in Developer Console → Configuration → Developer Token
   - **OAuth 2.0**: User-based authentication for apps where users sign in with Box. Ideal for web or mobile integrations.
   - **Server Auth – JWT**: Server account authentication without user sign-in. Ideal for automations and backend systems.
   - **Client Credentials Grant**: Server account authentication with its own account to grant permissions. Ideal for internal tools and data pipelines.

For detailed setup instructions, see the [Box Authentication Documentation](https://developer.box.com/guides/authentication/).

## Getting Started

The `box` package is a thin meta-package: it does not hide a new API. It exposes **official Box tools** through a small set of entry points so you can install once and stay on supported combinations of versions.

**At a glance**

- **CLI** — The `box` executable comes from `@box/cli` (Box CLI). Run it with your package manager’s usual patterns, for example `npx box`, `yarn box`, or `pnpm exec box` after a local install, or ephemeral runs such as `pnpm dlx box` / `yarn dlx box` when you prefer not to add a dependency first.
- **Node SDK** — The [Box Node SDK](https://github.com/box/box-node-sdk/tree/main/docs) (`box-node-sdk`) is available under the `box/sdk` subpath and nested `box/sdk/*` imports (see [Usage](#usage)).

**Export architecture (current surfaces)**

| Surface | Upstream | How you use it |
| --- | --- | --- |
| **CLI** | `@box/cli` | Shell: `npx box …`, `yarn box …`, `pnpm exec box …`, or other package-manager equivalents; same binary whether `box` is a project dependency or pulled ad hoc. |
| **Node SDK** | `box-node-sdk` | `import` / `require` from `box/sdk`, `box/sdk/managers`, `box/sdk/schemas`, etc. (see [Import from `box`](#import-from-box)). |

More rows will be added to the table above as additional Box developer tools are bundled into this package.

## Usage

This is a **namespace package**. Import specific modules using subpath imports:

### Import from `box`

The npm package name is `box`, but the **root entry has no exports**. Use subpath imports such as `box/sdk`:

```typescript
// ❌ This won't work - root has no exports
import something from 'box';

// ✅ Use subpath imports instead
import { BoxClient } from 'box/sdk';
```

**Available subpaths**

| Subpath | Description |
|---------|-------------|
| `box/sdk` | Main Box Node SDK - client and authentication |
| `box/sdk/managers` | All API resource managers (Files, Folders, Users, etc.) |
| `box/sdk/schemas` | TypeScript types and schema definitions |
| `box/sdk/parameters` | API method parameters and options |
| `box/sdk/networking` | Network client and session management |
| `box/sdk/serialization` | Serialization and deserialization utilities |
| `box/sdk/internal` | Internal utilities (advanced use) |

### Box SDK (Node / Browser compatible)

The official **[Box Node SDK](https://github.com/box/box-node-sdk)** (`box-node-sdk`) is re-exported from **`box/sdk`**. The other `box/sdk/*` paths in the table above map to the same SDK (managers, schemas, parameters, and so on).

**Example**
```typescript
import { BoxClient, BoxDeveloperTokenAuth } from 'box/sdk';

// Get a developer token from: https://app.box.com/developers/console
// Navigate to the app → Look at the Right hand side → Generate Developer Token
const token = process.env.BOX_DEVELOPER_TOKEN; // Store in .env file, NEVER commit!

async function main() {
  const auth = new BoxDeveloperTokenAuth({ token });
  const client = new BoxClient({ auth });
  const entries = (await client.folders.getFolderItems('0')).entries;
  entries.forEach((entry) => console.log(entry));
}

void main();
```

For production use, choose another `*Auth` class from `box/sdk` (for example `BoxCcgAuth`, `BoxJwtAuth`) as in the [Box Node SDK docs](https://github.com/box/box-node-sdk/tree/main/docs).

## CLI Tool

This package also includes the Box CLI:

```bash
npx box --help
```

Command and topic guides live in the [Box CLI docs](https://github.com/box/boxcli/tree/main/docs) in the upstream repo. For **authentication** (developer token, JWT, CCG, OAuth, `box login`, environments), follow [Authentication in the Box CLI](https://github.com/box/boxcli/blob/main/docs/authentication.md).

## Requirements

- **Node.js**: 22.0.0 or higher
- **TypeScript**: 5.0 or higher (optional)

## Features

- **Dual ESM/CJS support** - Works with both `import` and `require()`
- **Full TypeScript support** - Complete type definitions
- **Tree-shaking compatible** - Excellent tree-shaking: type imports (0 bytes), auth classes (~67 KB), specific managers (~91 KB), vs full BoxClient (845 KB).
- **Browser compatible** - ESM builds work in modern browsers
- **Zero runtime overhead** - Pure re-exports of official packages

## Documentation

- **[llms.txt](./llms.txt)** - Complete guide for AI agents and LLMs
- [Box Node SDK docs](https://github.com/box/box-node-sdk/tree/main/docs)
- [Box Platform API Reference](https://developer.box.com/reference/)
- [Box CLI docs](https://github.com/box/boxcli/tree/main/docs)


# Contributing

For information on how to contribute to this project, please see [the Contribution guidelines](./CONTRIBUTING.md).

# Questions, Bugs, and Feature Requests?

Need to contact us directly? [Browse the issues tickets](https://github.com/box/npm-box/issues)! Or, if that
doesn't work, [file a new one](https://github.com/box/npm-box/issues/new) and we will get
back to you. If you have general questions about the Box API, you can post to the [Box Developer Forum](https://community.box.com/box-platform-5).

# Copyright and License

Copyright 2026 Box, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
