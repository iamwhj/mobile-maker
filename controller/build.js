const request = require('../utils/require');
const { fork } = require('child_process');

const buildFn = async ({ ctx, type = 'all' }) => {
  const { API_URL } = process.env;
  const componentList = await request({url: `${API_URL}/components`, method: 'get'});
  if (type === 'all' || type === 'front') {
    // 打包front
    const buildFront = fork('../build/buildFront.js');
    buildFront.send({ componentList });
    buildFront.on('message', (data) => {
      // 处理打包结果，成功则保存信息，失败回滚
      processBuildResult(data);
    });
  }
  if (type === 'all' || type === 'generate') {
    // 打包generate
    const buildHtml = fork('../build/buildHtml.js');
    buildHtml.send({ componentList });
    buildHtml.on('message', (data) => {
      // 处理打包结果，成功则保存信息，失败回滚
      processBuildResult(data);
    });
  }
};

const processBuildResult = (data) => {
  const { status } = data;
  if (status === 'success') {
    // 打包成功

    // TODO 保存信息
  } else {
    // 打包失败

    // TODO 判断回滚
  }
}

class buildController {
  build(ctx) {
    ctx.body = {
      code: 0,
      message: '配置服务和预览服务开始打包，请等待！',
    };
    buildFn({ ctx, type: 'all' });
  }
  buildFront(ctx) {
    ctx.body = {
      code: 0,
      message: '配置服务开始打包',
    };
    buildFn({ ctx, type: 'front' });
  }
  buildHtml(ctx) {
    ctx.body = {
      code: 0,
      message: '预览服务开始打包',
    };
    buildFn({ ctx, type: 'generate' });
  }
}

module.exports = buildController;
