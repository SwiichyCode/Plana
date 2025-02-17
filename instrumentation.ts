export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('@/libs/sentry-server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('@/libs/sentry-server.config');
  }
}
