const { resolve, join } = require('path');
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const compressing = require('compressing');
const fs = require('fs-extra')

const { COMPONENT_FOLDER } = process.env;
const componentPath = resolve(__dirname, '../', COMPONENT_FOLDER);
const buildFront = async (componentList) => {
  const frontPath = resolve(__dirname, '../packages/front');
  const frontCompPath = resolve(frontPath, './src/custom-components');

  // 清空目录
  fs.emptyDirSync(frontCompPath);
  
  let importStr = '';
  let componentRegisterStr = '';
  for (const component of componentList) {
    const compResourcePath = join(componentPath, component.version);
    fs.copy(
      resolve(compResourcePath, component.name),
      resolve(frontCompPath, component.version)
    );

    importStr += `
      import ${component.name} from './${component.version}/component';\n
      import ${component.name}Config from './${component.version}/config';\n
    `;

    componentRegisterStr += `
      Vue.component('${component.name}', ${component.name});\n
      Vue.component('${component.name}Config', ${component.name}Config);\n
    `;
  }
  const indexStr = `
    ${importStr}
    const registerCustomComponents = (Vue) => {
    ${componentRegisterStr}
    };
    export default registerCustomComponents;
  `;

  // 生成覆盖/custom-components/index.js
  await fs.writeFile(resolve(frontCompPath, './index.js'), indexStr);

  console.log('front 开始打包');
  await exec('npm run build', { cwd: frontPath, encoding: 'utf-8' });
  console.log('front 结束打包');

  // 备份打包文件，用于回滚
  compressing.zip.compressDir(
    join(frontPath, './dist/'),
    join(componentPath, './front.zip')
  );

  return true;
};

process.on('message', async (message) => {
  // 打包流程
  console.time('front子进程打包成功，用时：')
  const { componentList } = message;
  try {
    const res = await buildFront(componentList);
    if (res) {
        console.timeEnd('front子进程打包成功，用时：')
        process.send({ status: 'success' })
    }
  } catch(err) {
    console.log('front子进程打包失败：', err);
    process.send({ status: 'fail', err })
  }
});
