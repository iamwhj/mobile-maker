const axios = require('axios');

const request = async ({ url, method, data = {} }) => {
  let params = {};
  // 请求参数处理
  if (method === 'get') {
    params = { data };
  } else if (method === 'post') {
    params = data;
  }

  await axios({ method, url, params }).then(result => {
    const res = result.data;
    if(res.code === 0) {
        return res.data
    }
  })
};

module.exports = require;
