const axios = require('axios');

const request = async ({ url, method, data = {} }) => {
  let params = {
    url,
    method,
  };
  // 请求参数处理
  if (method === 'get') {
    params.params = data;
  } else if (method === 'post') {
    params.data = data;
  }

  return await new Promise((resolve) => {
    axios(params).then((result) => {
      const res = result.data;
      if (res.code === 0) {
        resolve(res.data);
      }
    });
  });
};

module.exports = request;
