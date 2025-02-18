import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  serverExternalPackages: ['@sentry/nextjs'],
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
  org: 'plana-c1',
  project: 'javascript-nextjs',

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false, // Can be used to suppress logs
});
