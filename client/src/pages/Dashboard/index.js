import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DashboardPanel from './DashboardPanel';

@connect(({ dashboard }) => ({
  dashboard,
}))
class Dashboards extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/fetchAll',
    });
  }

  render() {
    const { dashboard } = this.props;
    const { dashboards, maximize } = dashboard;
    const colNumber = 4;
    const colSpan = 24 / colNumber;
    const rowHeight = 300;
    const maxHeight = 800;

    const dashboardsContents = [];

    const buildDashboard = (content, key) => {
      const { grammar, dataSource, title, description } = content;
      return (
        <Col span={colSpan} key={title}>
          <DashboardPanel
            id={key}
            grammar={grammar}
            dataSource={dataSource}
            title={title}
            description={description}
            height={rowHeight}
          />
        </Col>
      );
    };

    Object.keys(dashboards).forEach(key => {
      dashboardsContents.push(buildDashboard(dashboards[key], key));
    });

    if (!maximize) {
      return (
        <PageHeaderWrapper>
          <div>
            <Row gutter={16}>{dashboardsContents}</Row>
          </div>
        </PageHeaderWrapper>
      );
    }
    const maxDashboard = dashboards[maximize];
    const { grammar, dataSource, title, description } = maxDashboard;
    const isMax = true;
    return (
      <DashboardPanel
        id={maximize}
        grammar={grammar}
        dataSource={dataSource}
        title={title}
        description={description}
        height={maxHeight}
        isMax={isMax}
      />
    );
  }
}

export default Dashboards;
