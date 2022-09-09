module.exports = {
    apps: [
      {
        name: 'FOTD_Admin_Oracle',
        exec_mode: 'fork',
        instances: '1', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
  }