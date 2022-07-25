// 判断是否是移动端
export const isMobileEnv = () => {
  let u = navigator.userAgent;
  return u.match(/AppleWebKit.*Mobile.*/) ? true : false;
};

// debounce防抖函数
export const debounce = (fn, wait) => {
  let timer = null;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, arg);
    }, wait);
  };
};
