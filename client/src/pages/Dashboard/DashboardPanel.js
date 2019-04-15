import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Empty, Tooltip, Button, Modal, message } from 'antd';
import GGChart from '@/components/Visualization/GGChart';

import styles from './DashboardPanel.less';

const { confirm } = Modal;

@connect(({ dashboard }) => ({
  dashboard,
}))
class DashboardPanel extends PureComponent {
  render() {
    const { grammar, dataSource, title, description, dispatch, height, id, isMax } = this.props;
    const grammarUpdate = { ...grammar };
    if (!dataSource) {
      return <Empty />;
    }

    const doDeleteDashboard = () => {
      dispatch({
        type: 'dashboard/deleteSelected',
        payload: id,
      });
      message.info(`chart ${title} has been removed from dashboard!`);
    };

    const handleDelete = () => {
      confirm({
        title: 'Do you want to delete selected chart from dashboard?',
        content: `When clicked the OK button, chart with id ${id} will be removed from dashboard!`,
        onOk: doDeleteDashboard,
        onCancel() {},
      });
    };

    const handleMaximize = () => {
      dispatch({
        type: 'dashboard/maximizeSelected',
        payload: id,
      });
    };

    const handleMinimize = () => {
      dispatch({
        type: 'dashboard/maximizeSelected',
        payload: undefined,
      });
    };

    const buildButtons = () => {
      if (isMax) {
        return (
          <Tooltip placement="top" title="Minimize">
            <Button icon="minus" size="small" onClick={handleMinimize} />
          </Tooltip>
        );
      }
      return (
        <div>
          <Tooltip placement="top" title="Maximize">
            <Button icon="plus" size="small" onClick={handleMaximize} />
          </Tooltip>
          <Tooltip placement="top" title="Delete">
            <Button icon="delete" size="small" onClick={handleDelete} />
          </Tooltip>
        </div>
      );
    };

    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <span className={styles.dashboardTitle}>{title}</span>
          </Col>
          <Col span={12}>
            <div className={styles.dashboardControl}>{buildButtons()}</div>
          </Col>
        </Row>
        <Row gutter={16}>
          <span className={styles.dashboardSubtitle}>{description}</span>
        </Row>
        <Row gutter={16}>
          <GGChart grammar={grammarUpdate} data={dataSource} height={height} />
        </Row>
      </div>
    );
  }
}

export default DashboardPanel;
