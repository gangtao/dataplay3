import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import DatasetListSelector from './DatasetListSelector'
import DatasetTable from './DatasetTable'

import styles from './index.less';

@connect(({ dataset, loading }) => ({
  dataset,
  loading: loading.effects['dataset/fetch'],
}))
class Dataset extends PureComponent {

  render() {
    const { dataset, loading , dispatch } = this.props
    const { dataSource, columns } = dataset.currentDataset
    console.log("Render new dataset")
    console.log(dataset.currentDataset)
    return (
      <div className={styles.dataset}>
        <Row gutter={16}>
          <Col span={8}>
            <DatasetListSelector ></DatasetListSelector>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <DatasetTable dataSource={dataSource} columns={columns} ></DatasetTable>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dataset;
