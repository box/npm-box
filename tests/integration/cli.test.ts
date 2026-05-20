import { execSync } from 'child_process';
import { writeFileSync, unlinkSync, readFileSync, mkdtempSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { Readable } from 'stream';

const { BoxClient, BoxJwtAuth, JwtConfig } = require('box/sdk');

if (!process.env.JWT_CONFIG_BASE_64) {
  throw new Error(
    'JWT_CONFIG_BASE_64 environment variable is required to run integration tests'
  );
}

function createClient() {
  const configJson = Buffer.from(
    process.env.JWT_CONFIG_BASE_64!,
    'base64'
  ).toString('utf-8');
  const jwtConfig = JwtConfig.fromConfigJsonString(configJson);
  const auth = new BoxJwtAuth({ config: jwtConfig });
  return { client: new BoxClient({ auth }), auth };
}

describe('Integration: CLI wrapper with SDK token', () => {
  let token: string;
  let client: typeof BoxClient;

  beforeAll(async () => {
    const { client: c, auth } = createClient();
    client = c;
    const accessToken = await auth.retrieveToken();
    token = accessToken.accessToken;
  });

  test('get current user via CLI', () => {
    const result = execSync(
      `node bin/box.cjs users:get me --token=${token} --json`,
      { encoding: 'utf8', stdio: 'pipe' }
    );
    const user = JSON.parse(result);
    expect(user.id).toBeDefined();
    expect(user.type).toBe('user');
  });

  test('upload, download, and delete file via CLI', async () => {
    const tmpDir = mkdtempSync(join(tmpdir(), 'box-cli-test-'));
    const fileName = `cli-integration-test-${Date.now()}.txt`;
    const filePath = join(tmpDir, fileName);
    const content = 'box cli integration test content';

    writeFileSync(filePath, content);

    try {
      // Upload
      const uploadResult = execSync(
        `node bin/box.cjs files:upload "${filePath}" --parent-id=0 --token=${token} --json`,
        { encoding: 'utf8', stdio: 'pipe' }
      );
      const file = JSON.parse(uploadResult);
      expect(file.id).toBeDefined();
      expect(file.name).toBe(fileName);

      const fileId = file.id;

      try {
        // Download
        const downloadDir = mkdtempSync(join(tmpdir(), 'box-cli-download-'));
        execSync(
          `node bin/box.cjs files:download ${fileId} --destination="${downloadDir}" --token=${token}`,
          { encoding: 'utf8', stdio: 'pipe' }
        );
        const downloadedContent = readFileSync(
          join(downloadDir, fileName),
          'utf8'
        );
        expect(downloadedContent).toBe(content);

        unlinkSync(join(downloadDir, fileName));
      } finally {
        // Cleanup remote file
        execSync(
          `node bin/box.cjs files:delete ${fileId} --token=${token} --yes`,
          { encoding: 'utf8', stdio: 'pipe' }
        );
      }
    } finally {
      unlinkSync(filePath);
    }
  });
});
