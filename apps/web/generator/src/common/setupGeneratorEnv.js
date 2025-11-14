import autoRem from './rem'
const setGeneratorEnv = (curWindow = window) => {
  // init style
  const body = curWindow.document.body
  body.style.width = '100%'
  body.style.height = '100%'
  body.style.margin = 0
  body.style.overflowX = 'hidden'

  // auto rem (set root html font-size)
  autoRem(curWindow)
}

export default setGeneratorEnv
