const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isLocal = process.env.VUE_APP_ENV === 'localhost' ? true : false;
const remoteUrl = isLocal ? 'http://localhost:3000' : process.env.VUE_APP_API_URL;

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: remoteUrl,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: (config) => {
    const plugins = [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // new BundleAnalyzerPlugin(),
    ];
    // 生产环境加入gzip配置
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new CompressionPlugin({
          //此插件不能使用太高的版本，否则报错：TypeError: Cannot read property 'tapPromise' of undefined
          filename: '[path][base].gz', // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
          // filename: '[path].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
          algorithm: 'gzip', // 官方默认压缩算法也是gzip
          test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
          threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
          minRatio: 0.8, // 最小压缩比率，官方默认0.8
          //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
          // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
          deleteOriginalAssets: false,
        })
      );
    }
    return {
      plugins,
    };
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
