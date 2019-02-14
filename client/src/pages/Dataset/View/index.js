import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import DatasetTable from '@/components/Dataset/DatasetTable';

import styles from './index.less';

@connect(({ dataset, loading }) => ({
  dataset,
  loading: loading.effects['dataset/fetch'],
}))
class Dataset extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataset/fetch',
    });
  }

  render() {
    const { dataset, loading, dispatch } = this.props;
    const { dataSource, columns } = dataset.currentDataset;

    const handleChange = value => {
      console.log(`selected ${value}`);
      dispatch({
        type: 'dataset/fetchSelected',
        payload: value,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.dataset}>
          <Row gutter={16}>
            <Col span={8}>
              <Row>
                <DatasetListSelector list={dataset.list} handleChange={handleChange} />
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <DatasetTable dataSource={dataSource} columns={columns} />
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Dataset;
