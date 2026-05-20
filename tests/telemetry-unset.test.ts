test('x-box-ua header does not contain bundle when telemetry is not imported', () => {
  delete process.env.NPM_BOX_VERSION;
  const { xBoxUaHeader } = require('box-node-sdk/networking');
  expect(xBoxUaHeader).not.toContain('bundle=');
});
