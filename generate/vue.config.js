const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  productionSourceMap: false,
  css: {
    extract: false,
  },
  configureWebpack: {
    output: {
      crossOriginLoading: 'anonymous',
      filename: 'scripts/[name].[hash:8].min.js',
      chunkFilename: 'scripts/[name].[hash:8].min.js',
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap((args) => {
        args[0].title = '默认活动页';
        args[0].minify = { removeComments: false };
        return args;
      });
    }
  },
});
