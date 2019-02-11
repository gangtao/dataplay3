import React, { PureComponent } from 'react';
import { Row, Col, Select } from 'antd';

import DatasetListSelector from './DatasetListSelector'
import DatasetTable from './DatasetTable'

import styles from './index.less';

const { Option } = Select;

class Dataset extends PureComponent {
  render() {
    return (
      <div className={styles.dataset}>
        <Row gutter={16}>
          <Col span={8}>
            <DatasetListSelector></DatasetListSelector>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <DatasetTable></DatasetTable>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dataset;
