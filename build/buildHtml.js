const { resolve, join } = require('path');
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const compressing = require('compressing');
const fs = require('fs-extra')

const { COMPONENT_FOLDER } = process.env;
const componentPath = resolve(__dirname, '../', COMPONENT_FOLDER);
const buildGenerate = async (componentList) => {
  const generatePath = resolve(__dirname, '../packages/generate');
  const generateCompPath = resolve(generatePath, './src/custom-components');

  // 清空目录 custom-components (采用遍历，emptyDir有点Bug)
  if (fs.existsSync(generateCompPath)) {
    const oldCompList = fs.readdirSync(generateCompPath);
    oldCompList.forEach(folder => fs.removeSync(resolve(generateCompPath, folder)));
  } else {
    fs.mkdirSync(generateCompPath);
  }
  
  let importStr = '';
  let componentRegisterStr = '';
  for (const component of componentList) {
    const compResourcePath = join(componentPath, component.version);
    fs.copy(
      resolve(compResourcePath, component.name),
      resolve(generateCompPath, component.version)
    );

    importStr += `
      import ${component.name} from './${component.version}/component';\n
    `;

    componentRegisterStr += `
      Vue.component('${component.name}', ${component.name});\n
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
  await fs.writeFile(resolve(generateCompPath, './index.js'), indexStr);

  console.log(new Date().toLocaleString() + 'generate 开始打包');
  await exec('npm run build', { cwd: generatePath, encoding: 'utf-8' });
  console.log('generate 结束打包');

  const html = await fs.readFile(resolve(generatePath, './dist/', './index.html'), 'utf-8');

  // 备份打包文件，用于回滚
  compressing.zip.compressDir(
    join(generatePath, './dist/'),
    join(componentPath, './generate.zip')
  );

  return html;
};

process.on('message', async (message) => {
  // 打包流程
  console.time('generate子进程打包成功，用时：')
  const { componentList } = message;
  try {
    const html = await buildGenerate(componentList);
    if (html) {
        console.timeEnd('generate子进程打包成功，用时：')
        process.send({ status: 'success', html })
    }
  } catch(err) {
    console.log('generate子进程打包失败：', err);
    process.send({ status: 'fail', err })
  }
});
