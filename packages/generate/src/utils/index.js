// 判断是否是移动端
export const isMobileEnv = () => {
  let u = navigator.userAgent;
  return u.match(/AppleWebKit.*Mobile.*/) ? true : false;
};
