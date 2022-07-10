const { uncompress } = require('../utils');
const fs = require('fs')

class MainController {
  async uploadComponent(ctx) {
    const file = ctx.request.files.file;
    const buffer = fs.readFileSync(file.filepath)
    const version = await uncompress(buffer);
    ctx.body = { code: 0, message: '解压成功', data: { version } };
  }
}

module.exports = MainController;
