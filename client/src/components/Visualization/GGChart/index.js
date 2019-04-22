import React, { PureComponent } from 'react';
import { Empty } from 'antd';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Facet } from 'bizcharts';
import { DataSet } from '@antv/data-set';

const defaultHeight = 600;
const padding = 'auto';

class GGChart extends PureComponent {
  render() {
    const { grammar, data, height } = this.props;
    const { transformer, fscale } = grammar;
    const { DataView } = DataSet;
    const dv = new DataView();
    const scale = fscale ? fscale(data) : null;

    if (data) {
      dv.source(data);
      if (transformer) {
        dv.transform(transformer);
      }
    }

    const coordinationType = grammar.coordination;
    const buildCoordination = () => {
      if (coordinationType) {
        return <Coord type={coordinationType} />;
      }

      return null;
    };
    const coordination = buildCoordination();

    const validateGrammar = geom => {
      if (
        !coordinationType ||
        coordinationType === 'rect' ||
        coordinationType === 'polar' ||
        coordinationType === 'helix'
      ) {
        if (geom.position && geom.position.length === 2) {
          return true;
        }
      } else if (coordinationType === 'theta') {
        if (geom.position && geom.position.length >= 1) {
          return true;
        }
      }
      return false;
    };

    const buildGeom = (key, geom) => {
      const geomType = geom.geometry;
      let position = '';
      if (geom.position) {
        if (Array.isArray(geom.position)) {
          position = geom.position.join('*');
        } else {
          ({ position } = geom);
        }
      }

      let color = '';
      if (geom.color && geom.color.length > 0) {
        ({ color } = geom);
      }

      let size = '';
      if (geom.size && geom.size.length > 0) {
        size = geom.size.join('*');
      }

      let shape = '';
      if (geom.shape && geom.shape.length > 0) {
        shape = geom.shape.join('*');
      }

      let opacity = '';
      if (geom.opacity && geom.opacity.length > 0) {
        opacity = geom.opacity.join('*');
      }

      const { style } = geom;

      const buildLable = () => {
        if (geom.label && geom.label.length > 0) {
          const xlabel = geom.label.filter(function(el) {
            return el != null;
          });
          if (xlabel.length > 0) {
            return <Label content={xlabel.join('*')} />;
          }
        }
        return null;
      };
      const label = buildLable();
      return (
        <Geom
          key={key}
          type={geomType}
          {...position && { position }}
          {...color && { color }}
          {...size && { size }}
          {...shape && { shape }}
          {...opacity && { opacity }}
          {...style && { style }}
        >
          {label && label}
        </Geom>
      );
    };

    const buildGeomList = () => {
      if (!grammar.geom) {
        return [];
      }
      const geometryList = [];

      Object.entries(grammar.geom).forEach(function(item) {
        const [key, value] = item;
        if (validateGrammar(value)) {
          geometryList.push(buildGeom(key, value));
        }
      });

      return geometryList;
    };

    const buildAxis = () => {
      // Using Geom1 to buld Axis, May need configuration in the future
      if (grammar && grammar.geom && grammar.geom.Geom1 && grammar.geom.Geom1.position) {
        return Object.entries(grammar.geom.Geom1.position).map(item => {
          const [key, pos] = item;
          return <Axis key={key} name={pos} />;
        });
      }

      return null;
    };

    const buildSingeChart = () => {
      const geomList = buildGeomList();

      if (geomList.length === 0) {
        return <Empty />;
      }

      const axis = buildAxis();

      return (
        <div>
          <Chart
            height={height || defaultHeight}
            data={dv}
            padding={padding}
            {...scale && { scale }}
            forceFit
          >
            <Legend />
            <Tooltip />
            {axis}
            {coordination}
            {geomList}
          </Chart>
        </div>
      );
    };

    const buildfacat = () => {
      const geomList = buildGeomList();
      return (
        <Facet type="rect" fields={grammar.facat}>
          <View>{geomList}</View>
        </Facet>
      );
    };

    if (grammar.facat && grammar.facat.length > 0) {
      let facat = null;
      if (grammar.facat.length === 1 || grammar.facat.length === 2) {
        facat = buildfacat();
      } else {
        return <Empty />;
      }
      return (
        <div>
          <Chart
            height={height || defaultHeight}
            data={dv}
            padding={padding}
            {...scale && { scale }}
            forceFit
          >
            <Legend />
            <Tooltip />
            {facat}
          </Chart>
        </div>
      );
    }

    return buildSingeChart();
  }
}

export default GGChart;
