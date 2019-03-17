import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Empty } from 'antd';
import GGChart from '@/components/Visualization/GGChart';

@connect(({ gchart }) => ({
  gchart,
}))
class VisualizationPanel extends PureComponent {
  render() {
    const { gchart, dispatch } = this.props;
    const { grammar, currentDataset } = gchart;
    const grammarUpdate = { ...grammar };
    if (!currentDataset) {
      return <Empty />;
    }
    const data = currentDataset.dataSource;
    return <GGChart grammar={grammarUpdate} data={data} />;
  }
}

export default VisualizationPanel;
