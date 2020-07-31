/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  process.env.GIT_DISCOVERY_ACROSS_FILESYSTEM=1;
  let ENV = {
    build: {
      environment: 'development'
    },
    'ssh-index': { // copy and deploy index.html
      username: 'root',
      host: 'kobe-kaleidos-dev.s.redpencil.io',
      port: 22,
      remoteDir: '/data/kaleidos-project/config/frontend/',
      allowOverwrite: true,
      agent: process.env.SSH_AUTH_SOCK
    },
    'rsync': { // copy assets
      host: 'root@kobe-kaleidos-dev.s.redpencil.io',
      port: 22,
      dest: '/data/kaleidos-project/config/frontend/',
      delete: false,
      arg:['--verbose']
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
