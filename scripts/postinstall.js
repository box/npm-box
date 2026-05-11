#!/usr/bin/env node

// Skip in CI environments or if explicitly suppressed
if (process.env.CI || process.env.SUPPRESS_BOX_INSTALL_MESSAGE) {
  process.exit(0);
}

// Print getting-started message
console.log(`
✓ Box development tools installed successfully!

Get started:
  • SDK:  import BoxSDK from 'box/sdk'
  • CLI:  npx box <command>

Update to latest: npx box@latest <command>

Documentation: https://developer.box.com
`);
