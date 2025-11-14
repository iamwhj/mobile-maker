const Router = require('@koa/router');
const BuildCntl = require('../controller/build')

const buildCntl = new BuildCntl()

const router = new Router({
  prefix: '/build',
});

router.get('/', buildCntl.build);

router.get('/buildFront', buildCntl.buildFront);

router.get('/buildHtml', buildCntl.buildHtml);

module.exports = router;