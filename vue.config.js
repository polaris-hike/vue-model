const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    publicPath: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')).end();
    },
};

