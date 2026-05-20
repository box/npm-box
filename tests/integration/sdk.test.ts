import { Readable } from 'stream';

const { BoxClient, BoxJwtAuth, JwtConfig } = require('box/sdk');

if (!process.env.JWT_CONFIG_BASE_64) {
  throw new Error(
    'JWT_CONFIG_BASE_64 environment variable is required to run integration tests'
  );
}

function createClient(): typeof BoxClient {
  const configJson = Buffer.from(
    process.env.JWT_CONFIG_BASE_64!,
    'base64'
  ).toString('utf-8');
  const jwtConfig = JwtConfig.fromConfigJsonString(configJson);
  const auth = new BoxJwtAuth({ config: jwtConfig });
  return new BoxClient({ auth });
}

describe('Integration: SDK usage with JWT auth', () => {
  let client: typeof BoxClient;

  beforeAll(() => {
    client = createClient();
  });

  test('authenticate and get current user', async () => {
    const user = await client.users.getUserMe();
    expect(user.id).toBeDefined();
    expect(user.type).toBe('user');
  });

  test('upload, download, and delete file', async () => {
    const fileName = `integration-test-${Date.now()}.txt`;
    const content = 'box sdk integration test content';

    // Upload
    const uploadResult = await client.uploads.uploadFile({
      attributes: {
        name: fileName,
        parent: { id: '0' },
      },
      file: Readable.from(Buffer.from(content)),
    });
    const file = uploadResult.entries[0];
    expect(file.id).toBeDefined();
    expect(file.name).toBe(fileName);

    try {
      // Download
      const stream = await client.downloads.downloadFile(file.id);
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }
      const downloaded = Buffer.concat(chunks).toString();
      expect(downloaded).toBe(content);
    } finally {
      // Cleanup
      await client.files.deleteFileById(file.id);
    }
  });
});
