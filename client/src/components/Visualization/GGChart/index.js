import React, { PureComponent } from 'react';
import { Empty } from 'antd';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Facet } from 'bizcharts';
import styles from './index.less';

import { DataSet } from '@antv/data-set';

class GGChart extends PureComponent {
  render() {
    const { grammar, data, height } = this.props;
    const { transformer } = grammar;
    const { DataView } = DataSet;
    const defaultHeight = 600;
    const dv = new DataView();

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
        position = geom.position.join('*');
      }

      let color = '';
      if (geom.color) {
        if (Array.isArray(geom.color) && geom.color.length > 0) {
          color = geom.color.join('*');
        } else {
          color = geom.color;
        }
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

      const buildLable = () => {
        if (geom.label && geom.label.length > 0) {
          const lable = geom.label.join('*');
          return <Label content={lable} />;
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
        >
          {label}
        </Geom>
      );
    };

    const buildGeomList = () => {
      if (!grammar.geom) {
        return [];
      }
      const geometryList = [];

      Object.entries(grammar.geom).map(item => {
        const [key, value] = item;
        if (!validateGrammar(value)) {
          return [];
        }
        geometryList.push(buildGeom(key, value));
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
        <div className={styles.ggchart}>
          <Chart height={height || defaultHeight} data={dv} forceFit>
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
        <div className={styles.ggchart}>
          <Chart height={height || defaultHeight} data={dv} forceFit>
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
