// 动态加载svg图标:当前目录 不递归 匹配规则
const req = require.context('./', false, /\.svg$/);
req.keys().map(req);
