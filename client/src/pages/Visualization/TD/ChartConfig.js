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
    geom.position = [];
    geom.position.push(feeds.x);
    geom.position.push(feeds.y);
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
    geom.position = feeds.position;
    geom.color = feeds.color;
    grammar.geom.Geom1 = geom;
    return grammar;
  },
};

const chartList = [areaChart, pieChart];

export const chartConfigs = {
  value: chartList,
  find: function(name) {
    return chartList.filter(chart => chart.name === name);
  },
};
