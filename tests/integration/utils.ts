const { BoxClient, BoxJwtAuth, JwtConfig } = require('box/sdk');

if (!process.env.JWT_CONFIG_BASE_64) {
  throw new Error(
    'JWT_CONFIG_BASE_64 environment variable is required to run integration tests'
  );
}

function createAuth() {
  const configJson = Buffer.from(
    process.env.JWT_CONFIG_BASE_64!,
    'base64'
  ).toString('utf-8');
  const jwtConfig = JwtConfig.fromConfigJsonString(configJson);
  return new BoxJwtAuth({ config: jwtConfig });
}

export function createClient() {
  const auth = createAuth();
  return new BoxClient({ auth });
}

