import dotenv from 'dotenv';
dotenv.config();

interface MpaEnv {
  DATABASE_URL: string;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  JWT_SECRET_KEY: string;
  ORIGIN: string;
  PRIVATE_KEY: string;
}

const REQUIRED_ENV: (keyof MpaEnv)[] = [
  'DATABASE_URL', 'ORIGIN',
  'GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET',
  'JWT_SECRET_KEY', 'PRIVATE_KEY'
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processEnv: MpaEnv = process.env as any;

const missing = REQUIRED_ENV.filter(env => !processEnv[env]);
if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}`);
}

const originURL = new URL(processEnv.ORIGIN);

const env = {
  host: originURL.host,
  protocol: originURL.protocol.replace(':', ''),
  databaseUrl: processEnv.DATABASE_URL,
  googleOAuthClientId: processEnv.GOOGLE_OAUTH_CLIENT_ID,
  googleOAuthClientSecret: processEnv.GOOGLE_OAUTH_CLIENT_SECRET,
  jwtSecret: processEnv.JWT_SECRET_KEY,
  privateKey: processEnv.PRIVATE_KEY,
};

export default env;
