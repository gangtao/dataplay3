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
  build: function(feeds) {
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
  build: function(feeds) {
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
  build: function(feeds) {
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
  build: function(feeds) {
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
  build: function(feeds) {
    const grammar = {};
    grammar.facat = null;
    grammar.coordination = 'theta';
    grammar.geom = {};
    const geom = {};
    geom.geometry = 'intervalStack';
    geom.position = [feeds.position];
    geom.color = [feeds.color];
    grammar.geom.Geom1 = geom;
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
  build: function(feeds) {
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

const chartList = [areaChart, pieChart, barChart, scatterChart, lineChart, radarChart];

export const chartConfigs = {
  value: chartList,
  find: function(name) {
    return chartList.filter(chart => chart.name === name);
  },
};
