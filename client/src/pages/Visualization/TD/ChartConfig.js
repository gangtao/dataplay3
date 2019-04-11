const areaChart = {
  name: 'area',
  icon: 'area-chart',
  feeds: [
    {
      name: 'x',
      min: 1,
      max: 1,
    },
    {
      name: 'y',
      min: 1,
      max: 1,
    },
  ],
  build(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'rect';
    grammar.geom = {};
    const geom = {};
    geom.geometry = 'area';
    geom.position = [feeds.x, feeds.y];
    grammar.geom.Geom1 = geom;
    return grammar;
  },
};

const barChart = {
  name: 'bar',
  icon: 'bar-chart',
  feeds: [
    {
      name: 'x',
      min: 1,
      max: 1,
    },
    {
      name: 'y',
      min: 1,
      max: 1,
    },
  ],
  build(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'rect';
    grammar.geom = {};
    const geom = {};
    geom.geometry = 'interval';
    geom.position = [feeds.x, feeds.y];
    grammar.geom.Geom1 = geom;
    return grammar;
  },
};

const lineChart = {
  name: 'line',
  icon: 'line-chart',
  feeds: [
    {
      name: 'x',
      min: 1,
      max: 1,
    },
    {
      name: 'y',
      min: 1,
      max: 1,
    },
    {
      name: 'color',
      min: 1,
      max: 1,
    },
  ],
  build(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'rect';
    grammar.geom = {};
    const geom = {};
    geom.geometry = 'line';
    geom.position = [feeds.x, feeds.y];
    geom.color = [feeds.color];
    grammar.geom.Geom1 = geom;
    return grammar;
  },
};

const scatterChart = {
  name: 'scatter',
  icon: 'dot-chart',
  feeds: [
    {
      name: 'x',
      min: 1,
      max: 1,
    },
    {
      name: 'y',
      min: 1,
      max: 1,
    },
    {
      name: 'color',
      min: 1,
      max: 1,
    },
  ],
  build(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'rect';
    grammar.geom = {};
    const geom = {};
    geom.geometry = 'point';
    geom.shape = ['circle'];
    geom.position = [feeds.x, feeds.y];
    geom.color = [feeds.color];
    grammar.geom.Geom1 = geom;
    return grammar;
  },
};

const pieChart = {
  name: 'pie',
  icon: 'pie-chart',
  feeds: [
    {
      name: 'position',
      min: 1,
      max: 1,
    },
    {
      name: 'color',
      min: 1,
      max: 1,
    },
  ],
  build(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'theta';
    grammar.geom = {};
    const geom = {};
    geom.geometry = 'intervalStack';
    geom.position = ['percent'];
    geom.color = [feeds.color];
    grammar.geom.Geom1 = geom;
    if (feeds.position && feeds.color) {
      grammar.transformer = {
        type: 'percent',
        field: feeds.position,
        dimension: feeds.color,
        as: 'percent',
      };
    }
    return grammar;
  },
};

const radarChart = {
  name: 'radar',
  icon: 'radar-chart',
  feeds: [
    {
      name: 'theta',
      min: 1,
      max: 1,
    },
    {
      name: 'r',
      min: 1,
      max: 1,
    },
    {
      name: 'color',
      min: 1,
      max: 1,
    },
  ],
  build(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'polar';
    grammar.geom = {};
    const geom = {};
    geom.geometry = 'line';
    geom.position = [feeds.theta, feeds.r];
    geom.color = [feeds.color];
    grammar.geom.Geom1 = geom;
    return grammar;
  },
};

const trendChart = {
  name: 'trend',
  icon: 'stock',
  feeds: [
    {
      name: 'time',
      min: 1,
      max: 1,
    },
    {
      name: 'high',
      min: 0,
      max: 1,
    },
    {
      name: 'low',
      min: 0,
      max: 1,
    },
    {
      name: 'v1',
      min: 1,
      max: 1,
    },
    {
      name: 'v2',
      min: 0,
      max: 1,
    },
  ],
  build(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'rect';
    grammar.geom = {};
    const geom1 = {};
    geom1.geometry = 'line';
    geom1.color = 'red';
    geom1.position = [feeds.time, feeds.v1];
    grammar.geom.Geom1 = geom1;
    const geom2 = {};
    geom2.geometry = 'line';
    geom2.color = 'green';
    geom2.position = [feeds.time, feeds.v2];
    grammar.geom.Geom2 = geom2;
    const geom3 = {};
    geom3.geometry = 'area';
    geom3.position = [feeds.time, 'range'];
    grammar.geom.Geom3 = geom3;
    if (feeds.high && feeds.low) {
      grammar.transformer = {
        type: 'map',
        callback: obj => {
          obj.range = [obj[feeds.high], obj[feeds.low]];
          return obj;
        },
      };
    }
    return grammar;
  },
};

const chartList = [areaChart, pieChart, barChart, scatterChart, lineChart, radarChart, trendChart];

export const chartConfigs = {
  value: chartList,
  find(name) {
    return chartList.filter(chart => chart.name === name);
  },
};
