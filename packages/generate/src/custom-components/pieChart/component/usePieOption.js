const checkData = (data) => {
  // 剔除不合规则的数据
  const readyData = [];
  data.forEach((item) => {
    if (item.name && item.dataA) {
      readyData.push(item);
    }
  });
  return readyData;
};

const processData = (opt) => {
  const { dataSource } = opt;
  const data = {};
  // 格式检查，剔除空数据
  const readyData = checkData(dataSource);

  const source = [];
  readyData.forEach((item, i) =>
    source.push({
      name: item.name,
      value: Number(item.dataA),
      dataIndex: 0,
    })
  );
  data.source = source;
  return data;
};

const processLegend = (opt) => {
  const { legendShow } = opt;
  const legend = {
    show: legendShow,
    orient: 'horizontal',
  };
  return legend;
};

const processSeries = (opt) => {
  const { innerRadius, outerRadius } = opt;
  const series = {
    type: 'pie',
    datasetIndex: 0,
    center: ['50%', '55%'],
    radius: ['30%', '80%'],
    label: {
      show: false,
    },
  };

  const radiusData = [`${innerRadius}%`, `${outerRadius}%`];
  series.radius = radiusData;

  return series;
};

export const getPieOptions = (opt) => {
  const options = {
    series: {},
    legend: {},
  };

  // data
  const data = processData(opt);
  options.dataset = data;

  // legend
  const legend = processLegend(opt);
  options.legend = legend;

  // series
  const series = processSeries(opt);
  options.series = series;

  // 禁用鼠标滚轮事件
  options.preventDefaultMouseWheel = false;

  return options;
};
