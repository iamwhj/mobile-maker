const { v4 } = require('uuid')
const path = require('path')
const compressing = require('compressing')

const uncompress = async (buffer) => {
    const name = v4();
    const compressPath = path.join(__dirname, '../', process.env.COMPONENT_FOLDER, name);
    await compressing.zip.uncompress(buffer, compressPath);
    return name;
}

module.exports = {
    uncompress
}