const { VUE_APP_DESIGN_WIDTH, VUE_APP_UNIT_WIDTH } = process.env;

!(function (n) {
  var e = n.document,
    t = e.documentElement,
    i = VUE_APP_DESIGN_WIDTH, //240是设计稿尺寸
    d = i / VUE_APP_UNIT_WIDTH,
    o = 'orientationchange' in n ? 'orientationchange' : 'resize',
    a = function () {
      var n = t.clientWidth || VUE_APP_DESIGN_WIDTH;
      n > 720 && (n = 720);
      t.style.fontSize = n / d + 'px';
    };
  e.addEventListener &&
    (n.addEventListener(o, a, !1),
    e.addEventListener('DOMContentLoaded', a, !1));
})(window);
