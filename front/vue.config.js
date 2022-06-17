const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
  },
  chainWebpack(config) {
    // 默认加载svg规则，排除掉我们新建icon文件夹
    config.module.rule('svg').exclude.add(resolve('src/icon'));

    // 加入icon文件夹配置规则
    config.module
      .rule('icon')
      .include.add(resolve('src/icon'))
      .end()
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' });
  },
});
