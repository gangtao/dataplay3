import React, { PureComponent } from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import { connect } from 'dva';

import styles from './VisualizationPanel.less';

@connect(({ gg }) => ({
  gg
}))
class VisualizationPanel extends PureComponent {
  render() {
    const { grammar, currentDataset } = this.props.gg;
    const dataset = currentDataset;
    console.log('render Viz');
    console.log(grammar);
    console.log(dataset);

    const data = dataset.dataSource;

    const coordinationType = grammar.coordination;
    const buildCoordination = () => {
      if (coordinationType) {
        return <Coord type={coordinationType} />;
      } else {
        return null;
      }
    };
    const coordination = buildCoordination();

    //TODO: build a rule base grammar validator
    const validateGrammar = (geom) => {
      if (!coordinationType || coordinationType == 'rect' || coordinationType == 'polar') {
        if (geom.position && geom.position.length == 2) {
          return true;
        }
      }

      return false;
    };

    const buildGeom = (geom) => {
      const geomType = geom.geometry;
      let position = '';
      if (geom.position) {
        position = geom.position.join('*');
      }

      let color = '';
      if (geom.color && geom.color.length > 0) {
        color = geom.color[0];
      }

      let size = '';
      if (geom.size && geom.size.length > 0) {
        size = geom.size[0];
      }

      let shape = '';
      if (geom.shape && geom.shape.length > 0) {
        shape = geom.shape[0];
      }

      let opacity = '';
      if (geom.opacity && geom.opacity.length > 0) {
        opacity = geom.opacity[0];
      }

      const buildLable = () => {
        if (geom.label && geom.label.length > 0) {
          const lable = geom.label.join('*');
          return <Label content={lable} />;
        } else {
          return null;
        }
      };
      const label = buildLable();
      return (
        <Geom
          type={geomType}
          position={position}
          color={color}
          size={size}
          shape={shape}
          opacity={opacity}
        >
          {label}
        </Geom>
      );
    };

    const buildSingeChart = () => {
      
      if ( !grammar.geom ) {
        return <div />;
      }

      let geometryList = [];

      Object.entries(grammar.geom).map( item => {
        const value  = item[1];
        if (!validateGrammar(value)) {
          return <div />;
        }
        geometryList.push(buildGeom(value));
      })

      if ( geometryList.length === 0) {
        return <div />;
      }

      return (
        <div>
          <Chart height={600} data={data} forceFit>
            {coordination}
            {geometryList}
          </Chart>
        </div>
      );
    };

    const chart = buildSingeChart();
    return chart;
  }
}

export default VisualizationPanel;
