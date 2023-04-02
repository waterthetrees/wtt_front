module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start:dev',
      url: ['http://localhost:3001'],
      disableDevShmUsage: true,
      settings: {
        'chromeFlags': '--no-sandbox --headless --disable-gpu',
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};