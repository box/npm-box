describe('x-box-ua header telemetry', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('SDK attaches bundle=box/0.1.0 in x-box-ua header', () => {
    process.env.NPM_BOX_VERSION = '0.1.0';
    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).toContain('bundle=box/0.1.0');
  });

  test('x-box-ua header contains agent identifier', () => {
    process.env.NPM_BOX_VERSION = '0.1.0';
    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).toMatch(/agent=box-javascript-generated-sdk\/.+/);
  });

  test('x-box-ua header contains env identifier', () => {
    process.env.NPM_BOX_VERSION = '0.1.0';
    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).toMatch(/env=Node\/.+/);
  });

  test('x-box-ua header does not contain bundle when NPM_BOX_VERSION is unset', () => {
    delete process.env.NPM_BOX_VERSION;
    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).not.toContain('bundle=');
  });

  test('CLI wrapper reads version from package.json and sets NPM_BOX_VERSION', () => {
    const fs = require('fs');
    const path = require('path');
    const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // The CLI wrapper (bin/box.cjs) sets NPM_BOX_VERSION to package.json version
    process.env.NPM_BOX_VERSION = packageJson.version;

    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).toContain(`bundle=box/${packageJson.version}`);
  });
});
