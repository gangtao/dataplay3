import React, { PureComponent } from 'react';
import { Empty } from 'antd';
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


import GGChart from '@/components/Visualization/GGChart';
import styles from './VisualizationPanel.less';

export default connect(({ gg }) => ({
    gg
}))(GGChart);


