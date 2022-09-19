module.exports = {
  apps : [{
    name: 'todoist-server',
    script: './index.js',
    instances: 'max',
    exec_mode: 'cluster',
  }]
};
