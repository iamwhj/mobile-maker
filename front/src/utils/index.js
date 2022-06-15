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
