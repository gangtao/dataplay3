import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Empty } from 'antd';
import GGChart from '@/components/Visualization/GGChart';

@connect(({ gchart }) => ({
  gchart,
}))
class VisualizationPanel extends PureComponent {
  render() {
    const { gchart } = this.props;
    const { grammar, currentDataset } = gchart;
    // force update
    const grammarUpdate = { ...grammar };
    if (!currentDataset) {
      return <Empty />;
    }
    console.log(JSON.stringify(grammarUpdate));
    const data = currentDataset.dataSource;
    return <GGChart grammar={grammarUpdate} data={data} />;
  }
}

export default VisualizationPanel;
