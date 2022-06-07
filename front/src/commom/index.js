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

export const getComponentTemplateData = (name) => {
  return {
    name,
    mark: name + '-' + Date.now(),
    detail: {},
  };
};
