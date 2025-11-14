const Router = require('@koa/router');
const MainCntl = require('../controller')

const mainCntl = new MainCntl()

const router = new Router();

router.post('/upload-component', mainCntl.uploadComponent);

module.exports = router;