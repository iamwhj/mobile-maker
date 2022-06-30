!(function (n) {
  var e = n.document,
    t = e.documentElement,
    i = 240, //240是设计稿尺寸
    d = i / 12,
    o = 'orientationchange' in n ? 'orientationchange' : 'resize',
    a = function () {
      var n = t.clientWidth || 240;
      n > 720 && (n = 720);
      t.style.fontSize = n / d + 'px';
    };
  e.addEventListener &&
    (n.addEventListener(o, a, !1),
    e.addEventListener('DOMContentLoaded', a, !1));
})(window);
