module.exports = {
  apps: [{
    name: 'backend2',
    script: 'app.js',
    shutdown_with_message: true,
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
}