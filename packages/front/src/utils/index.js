import dayjs from 'dayjs';

// 深度克隆
export const deepClone = (orange, target = {}) => {
  if (!orange || typeof orange !== 'object') return;
  for (const key in orange) {
    if (Object.hasOwnProperty.call(orange, key)) {
      if (typeof orange[key] !== 'object') {
        target[key] = orange[key];
      } else {
        const isArray = Array.isArray(orange[key]);
        if (isArray) target[key] = deepClone(orange[key], []);
        else target[key] = deepClone(orange[key], {});
      }
    }
  }
  return target;
};

// 返回格式化日期
export const formatTime = (date) => {
  if (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

// 去除无需更新的字段（mongodb更新数据）
export const removeFieldForMongodb = (data) => {
  const fieldList = ['_id', 'id', 'create_time'];
  for (const key of fieldList) {
    delete data[key];
  }
  return data;
};

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
