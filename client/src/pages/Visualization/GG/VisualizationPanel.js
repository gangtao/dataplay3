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

import styles from './VisualizationPanel.less';

class VisualizationPanel extends PureComponent {
  render() {
    const { grammar, dataset } = this.props;
    console.log('render Viz');
    console.log(grammar);
    console.log(dataset);

    const data = dataset.dataSource;

    const geomType = grammar.geometry;
    let position = '';
    if (grammar.position) {
      position = grammar.position.join('*');
    }

    let color = '';
    if (grammar.color && grammar.color.length > 0) {
      color = grammar.color[0];
    }

    let size = '';
    if (grammar.size && grammar.size.length > 0) {
      size = grammar.size[0];
    }

    let shape = '';
    if (grammar.shape && grammar.shape.length > 0) {
      shape = grammar.shape[0];
    }

    let opacity = '';
    if (grammar.opacity && grammar.opacity.length > 0) {
      opacity = grammar.opacity[0];
    }

    const buildLable = () => {
      if (grammar.label && grammar.label.length > 0) {
        const lable = grammar.label.join('*');
        return <Label content={lable} />;
      } else {
        return null;
      }
    };
    const label = buildLable();

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
    const validateGrammar = () => {
      if (!coordinationType || coordinationType == 'rect' || coordinationType == 'polar') {
        if (grammar.position && grammar.position.length == 2) {
          return true;
        }
      }

      return false;
    };

    const buildGeom = () => {
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
      const geom = buildGeom();
      if (validateGrammar()) {
        return (
          <div>
            <Chart height={600} data={data} forceFit>
              {coordination}
              {geom}
            </Chart>
          </div>
        );
      } else {
        return <div />;
      }
    };

    const chart = buildSingeChart();
    return chart;
  }
}

export default VisualizationPanel;
