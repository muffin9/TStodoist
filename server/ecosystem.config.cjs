module.exports = {
  apps : [{
    name: 'todoist-server',
    script: 'corss-env NODE_ENV=production ./index.js',
    instances: 'max',
    exec_mode: 'cluster',
  }]
};
