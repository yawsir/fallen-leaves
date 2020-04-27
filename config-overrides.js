const path = require('path')
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.alias['@views'] = path.join(__dirname, 'src/views')
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components')
    config.resolve.alias['@style'] = path.join(__dirname, 'src/style')
    config.resolve.alias['@utils'] = path.join(__dirname, 'src/utils')
    return config
  }