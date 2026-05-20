import { execSync } from 'child_process';

test('box CLI wrapper executes', () => {
  const result = execSync('node bin/box.cjs --version', {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  expect(result).toContain('box');
});

test('box update command shows helpful message instead of forwarding', () => {
  const result = execSync('node bin/box.cjs update', {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  expect(result).toContain('To update box');
  expect(result).toContain('npx box@latest');
  expect(result).toContain('npm install -g box');
});
