describe('x-box-ua header telemetry', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.NPM_BOX_VERSION;
  });

  test('importing telemetry sets NPM_BOX_VERSION env var', () => {
    require('../src/telemetry');
    expect(process.env.NPM_BOX_VERSION).toBe('0.1.0');
  });

  test('SDK attaches bundle version in x-box-ua header after telemetry import', () => {
    require('../src/telemetry');
    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).toContain('bundle=box/0.1.0');
  });

  test('x-box-ua header contains agent identifier', () => {
    require('../src/telemetry');
    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).toMatch(/agent=box-javascript-generated-sdk\/.+/);
  });

  test('x-box-ua header contains env identifier', () => {
    require('../src/telemetry');
    const { xBoxUaHeader } = require('box-node-sdk/networking');
    expect(xBoxUaHeader).toMatch(/env=Node\/.+/);
  });
});
