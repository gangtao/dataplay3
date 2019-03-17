import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

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
    const { query, dashboard } = this.props;

    return (
      <PageHeaderWrapper>
        <div className={styles.dashboard}>
          <Row gutter={16}>
            <Col span={8}>This is Dashboards</Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Dashboards;
