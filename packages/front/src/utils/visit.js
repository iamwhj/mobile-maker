import { updateVisitNew, updateVisitOld } from '@/api/visit';

// 简略的方案，比较粗糙，不精准
export const visitor = () => {
  const uuid = 'mark-uuid';
  const nowTime = Date.now();
  if (existItem(uuid)) {
    // oldUser
    const lastTime = Number(getItem(uuid));
    if (nowTime - lastTime > 1 * 60 * 1000) {
      updateVisitOld();
      setItem(uuid, nowTime);
    }
  } else {
    // newUser
    updateVisitNew();
    setItem(uuid, nowTime);
  }
};

const getItem = (key) => localStorage.getItem(key);

const setItem = (key, val) => localStorage.setItem(key, val);

const existItem = (key) => (getItem(key) ? true : false);
