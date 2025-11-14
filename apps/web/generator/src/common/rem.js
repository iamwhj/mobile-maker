import { DESIGN_WIDTH, UNIT_WIDTH } from '../utils/constant'

const autoRem = (curWindow = window) => {
  function setHtmlFontSize(n) {
    var e = n.document,
      t = e.documentElement,
      i = DESIGN_WIDTH, //240是设计稿尺寸
      d = i / UNIT_WIDTH,
      o = 'orientationchange' in n ? 'orientationchange' : 'resize',
      a = function () {
        var n = t.clientWidth || DESIGN_WIDTH
        n > 720 && (n = 720)
        t.style.fontSize = n / d + 'px'
      }
    e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener('DOMContentLoaded', a, !1))
  }
  setHtmlFontSize(curWindow)
}

export default autoRem
