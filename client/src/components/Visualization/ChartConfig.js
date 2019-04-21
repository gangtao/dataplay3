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
    if (feeds.x && feeds.y) {
      geom.position = [feeds.x, feeds.y];
    }
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
    if (feeds.x && feeds.y) {
      geom.position = [feeds.x, feeds.y];
    }
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
    if (feeds.x && feeds.y) {
      geom.position = [feeds.x, feeds.y];
    }
    if (feeds.color) {
      geom.color = [feeds.color];
    }
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
    if (feeds.x && feeds.y) {
      geom.position = [feeds.x, feeds.y];
    }
    if (feeds.color) {
      geom.color = [feeds.color];
    }
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
    if (feeds.color) {
      geom.color = [feeds.color];
    }
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
    if (feeds.theta && feeds.r) {
      geom.position = [feeds.theta, feeds.r];
    }
    if (feeds.color) {
      geom.color = [feeds.color];
    }
    grammar.geom.Geom1 = geom;
    return grammar;
  },
};

const heatmapChart = {
  name: 'heatmap',
  icon: 'heat-map',
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
    const geom1 = {};
    geom1.geometry = 'polygon';
    if (feeds.x && feeds.y) {
      geom1.position = [feeds.x, feeds.y];
    }

    if (feeds.color) {
      geom1.label = [feeds.color];
      geom1.color = [feeds.color, '#BAE7FF-#1890FF-#0050B3'];
    }
    geom1.style = {
      stroke: '#fff',
      lineWidth: 1,
    };
    grammar.fscale = d => {
      if (!d) {
        return null;
      }

      if (!feeds.x || !feeds.y) {
        return null;
      }

      const xVal = d.map(e => e[feeds.x]);
      const yVal = d.map(e => e[feeds.y]);
      const xUnique = xVal.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
      const yUnique = yVal.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });

      const cols = {};
      cols[feeds.x] = {
        type: 'cat',
        values: xUnique,
      };
      cols[feeds.y] = {
        type: 'cat',
        values: yUnique,
      };
      return cols;
    };

    grammar.geom.Geom1 = geom1;
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
    if (feeds.time && feeds.v1) {
      geom1.position = [feeds.time, feeds.v1];
    }

    grammar.geom.Geom1 = geom1;
    const geom2 = {};
    geom2.geometry = 'line';
    geom2.color = 'green';
    if (feeds.time && feeds.v2) {
      geom2.position = [feeds.time, feeds.v2];
    }

    grammar.geom.Geom2 = geom2;
    const geom3 = {};
    geom3.geometry = 'area';
    if (feeds.time) {
      geom3.position = [feeds.time, 'range'];
    }
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

    grammar.fscale = d => {
      if (!d) {
        return null;
      }

      if (!feeds.high || !feeds.low) {
        return null;
      }

      const highVal = d.map(e => e[feeds.high]);
      const lowVal = d.map(e => e[feeds.low]);
      const min = Math.min(...lowVal, ...highVal);
      const max = Math.max(...lowVal, ...highVal);

      const cols = {};
      const scale = {
        min,
        max,
        nice: false,
      };
      cols.range = scale;
      cols[feeds.v1] = scale;
      cols[feeds.v2] = scale;
      cols[feeds.time] = {
        type: 'time',
        nice: false,
      };

      return cols;
    };

    return grammar;
  },
};

const chartList = [
  areaChart,
  pieChart,
  barChart,
  scatterChart,
  lineChart,
  radarChart,
  trendChart,
  heatmapChart,
];

const chartConfigs = {
  value: chartList,
  find(name) {
    return chartList.filter(chart => chart.name === name);
  },
};

export default chartConfigs;
