const request = require('../utils/require');
const { fork } = require('child_process');
const { resolve } = require('path')

const buildFn = async ({ ctx, type = 'all' }) => {
  // 组件列表
  const { API_URL } = process.env;
  const componentList = await request({ url: `${API_URL}/component`, method: 'get' });

  if (type === 'all' || type === 'front') {
    // 打包front
    const buildFront = fork(resolve(__dirname, '../build/buildFront.js'));
    buildFront.send({ componentList });
    buildFront.on('message', (data) => {
      // 处理打包结果，成功则保存信息，失败回滚
      processBuildResult(data, 'front');
    });
  }
  if (type === 'all' || type === 'generate') {
    // 打包generate
    const buildHtml = fork(resolve(__dirname, '../build/buildHtml.js'));
    buildHtml.send({ componentList });
    buildHtml.on('message', (data) => {
      // 处理打包结果，成功则保存信息，失败回滚
      processBuildResult(data, 'generate');
    });
  }

  const buildResult = {
    front: { status: '', data: '' },
    generate: { status: '', html: '' },
  };
  console.time('完成所有打包，总耗时：')
  const processBuildResult = (data, buildType) => {
    buildResult[buildType] = data;
    const { status } = data;
    if (status === 'success') {
      // 打包成功，保存信息
      if (judgeBuildRes(buildResult, type)) buildSuccessFn({ buildResult, type, componentList });
    } else if (status === 'fail') {
      // 打包失败
  
      // TODO 判断回滚
      console.log('打包失败，回滚操作');
    }
  }
};

// 判断打包状态，如果是 all 需要两个项目都打包成功才算成功
const judgeBuildRes = (buildResult, type) => {
  const { front, generate } = buildResult;
  if (type === 'all') {
    if (front.status === 'success' && generate.status === 'success') return true;
  } else if (type === 'front') {
    if (front.status === 'success') return true;
  } else if (type === 'generate') {
    if (generate.status === 'success') return true;
  }
  return false;
}

const buildSuccessFn = async ({ buildResult, type, componentList }) => {
  const updateComponent = [];
  for (const component of componentList) { 
    const { id, version, success_version } = component;
    if (version !== success_version) {
      updateComponent.push({ id, success_version: version })
    } 
  }

  const { API_URL } = process.env;
  const updatePromise = [];
  updateComponent.forEach(comp => {
    // 更新数据库 successVersion
    const data = { id: comp.id, data: comp }
    updatePromise.push(request({ url: `${API_URL}/component/update`, method: 'post', data }));
  })
  await new Promise(resolve => {
    Promise.all(updatePromise).then(resolve)
  })

  // 更新html模板
  if (type === 'all' || type === 'generate') {
    const data = { html: buildResult.generate.html }
    await request({ url: `${API_URL}/htmlTemplate`, method: 'post', data })
  }

  console.timeEnd('完成所有打包，总耗时：');
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
