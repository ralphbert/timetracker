let baseConfig = Object.assign({}, require('./webpack.config.base'));
console.log('baseConfig', baseConfig);
baseConfig.target = 'node';
module.exports = baseConfig;