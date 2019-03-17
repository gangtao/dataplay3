import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Empty, PageHeader } from 'antd';
import GGChart from '@/components/Visualization/GGChart';

import styles from './DashboardPanel.less';

class DashboardPanel extends PureComponent {
  render() {
    const { grammar, dataSource, title, description, dispatch, height } = this.props;
    const grammarUpdate = { ...grammar };
    if (!dataSource) {
      return <Empty />;
    }
    return (
      <div>
        <span className={styles.dashboardTitle}>{title}</span>
        <span className={styles.dashboardSubtitle}>{description}</span>
        <GGChart grammar={grammarUpdate} data={dataSource} height={height} />
      </div>
    );
  }
}

export default DashboardPanel;
