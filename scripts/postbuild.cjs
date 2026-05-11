#!/usr/bin/env node

/**
 * Post-build script to add package.json files to output directories.
 * This tells Node.js how to interpret .js files in each directory.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

// Create package.json for ESM output
const esmPackageJson = { type: 'module' };
fs.writeFileSync(
  path.join(distDir, 'esm', 'package.json'),
  JSON.stringify(esmPackageJson, null, 2) + '\n'
);

// Create package.json for CJS output
const cjsPackageJson = { type: 'commonjs' };
fs.writeFileSync(
  path.join(distDir, 'cjs', 'package.json'),
  JSON.stringify(cjsPackageJson, null, 2) + '\n'
);

console.log('✓ Created package.json files in dist/esm and dist/cjs');
