describe('Package exports', () => {
  test('box/sdk exports BoxClient', () => {
    const { BoxClient } = require('box/sdk');
    expect(BoxClient).toBeDefined();
    expect(typeof BoxClient).toBe('function');
  });

  test('all subpaths resolve without errors', () => {
    expect(() => require('box/sdk')).not.toThrow();
    expect(() => require('box/sdk/managers')).not.toThrow();
    expect(() => require('box/sdk/schemas')).not.toThrow();
    expect(() => require('box/sdk/parameters')).not.toThrow();
    expect(() => require('box/sdk/networking')).not.toThrow();
    expect(() => require('box/sdk/serialization')).not.toThrow();
  });

  test('root import exports guard marker', () => {
    const rootExports = require('box');
    expect(rootExports.__DO_NOT_IMPORT_FROM_ROOT__).toBe(true);
  });
});
