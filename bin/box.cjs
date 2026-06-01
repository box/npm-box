#!/usr/bin/env node

/**
 * Box CLI wrapper with telemetry support
 *
 * This wrapper sets environment markers before executing the Box CLI,
 * allowing the CLI to detect it's being used through the box meta-package.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Read package version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Set telemetry markers
process.env.NPM_BOX_VERSION = version;

// Path to the actual Box CLI
const cliDir = path.dirname(require.resolve('@box/cli/package.json'));
const cliPath = path.join(cliDir, 'bin', 'run');

// Forward all arguments to the CLI
const args = process.argv.slice(2);

// Intercept the 'update' command — it cannot update this wrapper package
if (args[0] === 'update') {
  console.log(`To update box (current: v${version}), run one of:\n`);
  console.log('  npx box@latest <command>    Always use the latest version');
  console.log('  npm install -g box          Update your global installation');
  process.exit(0);
}

// Spawn the CLI process
const cli = spawn(process.execPath, [cliPath, ...args], {
  stdio: 'inherit',
  env: process.env,
});

// Forward exit code
cli.on('exit', (code) => {
  process.exit(code || 0);
});

// Handle errors
cli.on('error', (err) => {
  console.error('Failed to start Box CLI:', err);
  process.exit(1);
});
