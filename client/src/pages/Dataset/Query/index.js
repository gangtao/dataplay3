import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetTable from '@/components/Dataset/DatasetTable';
import QueryBuilder from './QueryBuilder';

import styles from './index.less';

@connect(({ query }) => ({
  query,
}))
class QueryPage extends PureComponent {
  render() {
    const { query, dispatch } = this.props;
    const { currentQuery, currentQueryResult } = query;

    const handleQuery = () => {
      console.log('do query');
      dispatch({
        type: 'query/fetchQuery',
        payload: currentQuery,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.getDataIn}>
          <Row gutter={16}>
            <Col>
              <QueryBuilder onQuery={handleQuery} />
            </Col>
          </Row>
          <Row>
            <DatasetTable
              dataSource={currentQueryResult.dataSource}
              columns={currentQueryResult.columns}
            />
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default QueryPage;
