const request = require('../utils/require');
const { fork } = require('child_process');
const { resolve } = require('path');
const compressing = require('compressing');
const fs = require('fs-extra');

// 全局打包状态，一次只能跑一个打包线程（防止同时打包和回滚冲突）
let building = false;

const buildFn = async ({ ctx, type = 'all' }) => {
  // 开始打包
  building = true;
  
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
    start: Date.now(),
    front: { status: '', data: '' },
    generate: { status: '', html: '' },
  };

  let backups = false;
  const processBuildResult = async (data, buildType) => {
    buildResult[buildType] = data;
    const { status } = data;
    if (status === 'success') {
      // 打包成功，保存信息
      if (judgeBuildRes(buildResult, type)) await buildSuccessFn({ buildResult, type, componentList });
    } else if (status === 'fail') {
      // 打包失败，回滚
      console.log(buildType, '打包失败，即将回滚');
      // 标志回滚
      backups = true;
    }
    // 回滚
    if (backups && type === 'all') {
      // 等待 front 和 generate 都结束时回滚
      if (buildResult.front.status && buildResult.generate.status) await buildFailFn({ type });
    } else if (backups && type !== 'all') {
      await buildFailFn({ type })
    }

    // 结束打包
    building = false;
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

// 打包成功，保存更新信息
const buildSuccessFn = async ({ buildResult, type, componentList }) => {
  const updateComponent = [];
  for (const component of componentList) { 
    const { id, version, success_version } = component;
    if (version !== success_version) {
      updateComponent.push({ id, success_version: version })
    } 
  }

  // 更新组件打包成功版本号success_version
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

  const end = Date.now()
  console.log(`完成所有打包，总耗时：${(end - buildResult.start) / 1000}s`);
}

// 打包失败，进行回滚
const buildFailFn = async ({ type }) => {
  const { COMPONENT_FOLDER } = process.env;
  const componentPath = resolve(__dirname, '../', COMPONENT_FOLDER);
  // 回滚 front
  if (type === 'all' || type === 'front') {
    const frontPath = resolve(__dirname, '../packages/front');
    const frontDist = resolve(frontPath, './dist');
    const backupsFrontZip = fs.readFileSync(resolve(componentPath, './front.zip'));
    await fs.emptyDir(frontDist)
    await compressing.zip.uncompress(backupsFrontZip, frontPath);
    console.log('front 回滚成功！');
  }
  // 回滚 generate
  if (type === 'all' || type === 'generate') {
    const generatePath = resolve(__dirname, '../packages/generate');
    const generateDist = resolve(generatePath, './dist');
    const backupsGenerateZip = fs.readFileSync(resolve(componentPath, './generate.zip'));
    await fs.emptyDir(generateDist)
    await compressing.zip.uncompress(backupsGenerateZip, generatePath);
    console.log('generate 回滚成功！');
  }
  console.log('回滚结束');
}

const buildingMsg = '打包正在进行，请稍后在试！';
class buildController {
  build(ctx) {
    let msg = '配置服务、预览服务开始打包，请等待！';
    if (building) msg = buildingMsg;
    ctx.body = {
      code: 0,
      message: msg,
    };
    !building && buildFn({ ctx, type: 'all' });
  }
  buildFront(ctx) {
    let msg = '配置服务开始打包';
    if (building) msg = buildingMsg;
    ctx.body = {
      code: 0,
      message: msg,
    };
    !building && buildFn({ ctx, type: 'front' });
  }
  buildHtml(ctx) {
    let msg = '预览服务开始打包';
    if (building) msg = buildingMsg;
    ctx.body = {
      code: 0,
      message: msg,
    };
    !building && buildFn({ ctx, type: 'generate' });
  }
  resetBuildStatus(ctx) {
    building = false
    ctx.body = {
      code: 0,
      message: '重置打包状态成功！',
    };
  }
}

module.exports = buildController;
