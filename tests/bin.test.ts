import { execSync } from 'child_process';

test('box CLI wrapper executes', () => {
  const result = execSync('node bin/box.cjs --version', {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  expect(result).toContain('box');
});
