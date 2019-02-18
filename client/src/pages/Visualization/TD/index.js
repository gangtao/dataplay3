import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import styles from './index.less';

@connect(({ tchart, loading }) => ({
  tchart,
  loading: loading.effects['tchart/fetch'],
}))
class TypeDrivenChart extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tchart/fetch',
    });
  }

  render() {
    const { tchart, loading, dispatch } = this.props;
    const { dataSource, columns } = tchart.currentDataset;

    const handleChange = value => {
      dispatch({
        type: 'tchart/fetchSelected',
        payload: value,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.td}>
          <Row gutter={16}>
              <Col span={6}>
                <Row>
                  Dataset:
                  <DatasetListSelector list={tchart.list} handleChange={handleChange} />
                </Row>
              </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default TypeDrivenChart;
