export const getActivityTemplateData = () => {
  return {
    page: {
      components: [],
      detail: {
        name: '',
        title: '活动标题',
      },
    },
  };
};

export const getComponentTemplateData = (name) => {
  return {
    name,
    mark: name + '-' + Date.now(),
    detail: {},
  };
};
