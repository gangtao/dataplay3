import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetTable from '@/components/Dataset/DatasetTable';
import QueryBuilder from './QueryBuilder'

import styles from './index.less';

@connect(({ query}) => ({
  query
}))
class QueryPage extends PureComponent {
  render() {
    const { query, dispatch } = this.props;
    const { currentQuery, currentQueryResult } = query

    const handleQueryChange = value => {
      const payload = {};
      payload.dataset = value;
      payload.query = query.query;
      dispatch({
        type: 'query/fetchQuery',
        payload: value,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.getDataIn}>
          <Row gutter={16}>
            <Col span={8}>
              <QueryBuilder/>
            </Col>
            <Col span={16}>
              <Row>
                <DatasetTable dataSource={currentQueryResult.data} columns={currentQueryResult.columns} />
              </Row>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default QueryPage;
