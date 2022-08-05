// 活动数据标准model
export const getActivityTemplateData = () => {
  return {
    components: [],
    detail: {
      name: '',
      title: '活动页',
      date: [],
    },
    mark: 'activity-' + Date.now(),
  };
};

// 组件数据标准model
export const getComponentTemplateData = ({ name, fullName }) => {
  return {
    name,
    fullName,
    mark: name + '-' + Date.now(),
    detail: {},
    style: {},
  };
};
