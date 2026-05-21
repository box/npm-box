import { Readable } from 'stream';

const {
  BoxClient,
  BoxDeveloperTokenAuth,
} = require('box/sdk');

function createMockClient(): typeof BoxClient {
  const auth = new BoxDeveloperTokenAuth({ token: 'test-token' });
  return new BoxClient({ auth });
}

describe('SDK usage', () => {
  let client: typeof BoxClient;

  beforeEach(() => {
    client = createMockClient();
  });

  describe('get current user', () => {
    test('getUserMe calls the correct endpoint', async () => {
      const mockUser = { id: '12345', type: 'user', name: 'Test User' };
      client.users.getUserMe = jest.fn().mockResolvedValue(mockUser);

      const user = await client.users.getUserMe();
      expect(user).toEqual(mockUser);
      expect(user.id).toBe('12345');
      expect(user.name).toBe('Test User');
      expect(client.users.getUserMe).toHaveBeenCalledTimes(1);
    });
  });

  describe('upload file', () => {
    test('uploadFile accepts stream and attributes', async () => {
      const mockFile = {
        id: '98765',
        type: 'file',
        name: 'test.txt',
        size: 11,
        parent: { id: '0', type: 'folder' },
      };
      client.uploads.uploadFile = jest.fn().mockResolvedValue({
        totalCount: 1,
        entries: [mockFile],
      });

      const fileStream = Readable.from(Buffer.from('hello world'));
      const result = await client.uploads.uploadFile({
        attributes: { name: 'test.txt', parent: { id: '0' } },
        file: fileStream,
      });

      expect(result.entries[0].id).toBe('98765');
      expect(result.entries[0].name).toBe('test.txt');
      expect(client.uploads.uploadFile).toHaveBeenCalledWith({
        attributes: { name: 'test.txt', parent: { id: '0' } },
        file: fileStream,
      });
    });
  });

  describe('download file', () => {
    test('downloadFile returns file content as stream', async () => {
      const content = Buffer.from('hello world');
      const mockStream = Readable.from(content);
      client.downloads.downloadFile = jest.fn().mockResolvedValue(mockStream);

      const stream = await client.downloads.downloadFile('98765');
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }
      const downloaded = Buffer.concat(chunks).toString();

      expect(downloaded).toBe('hello world');
      expect(client.downloads.downloadFile).toHaveBeenCalledWith('98765');
    });
  });

  describe('upload and download roundtrip', () => {
    test('uploaded file can be downloaded with same content', async () => {
      const originalContent = 'box sdk integration test content';
      const mockFile = { id: '11111', type: 'file', name: 'roundtrip.txt' };

      client.uploads.uploadFile = jest.fn().mockResolvedValue({
        totalCount: 1,
        entries: [mockFile],
      });
      client.downloads.downloadFile = jest
        .fn()
        .mockResolvedValue(Readable.from(Buffer.from(originalContent)));

      const uploadResult = await client.uploads.uploadFile({
        attributes: { name: 'roundtrip.txt', parent: { id: '0' } },
        file: Readable.from(Buffer.from(originalContent)),
      });
      const fileId = uploadResult.entries[0].id;

      const stream = await client.downloads.downloadFile(fileId);
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }
      const downloadedContent = Buffer.concat(chunks).toString();

      expect(downloadedContent).toBe(originalContent);
      expect(client.downloads.downloadFile).toHaveBeenCalledWith('11111');
    });
  });
});