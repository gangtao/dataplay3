import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import MLJobOptionCreationPanel from '@/components/Prediction/MLJobOptionCreationPanel';

import styles from './JobViewPanel.less';

class JobViewPanel extends PureComponent {
  render() {
    const {
      isCreation,
      datasetList,
      selectedDataset,
      handleDatasetSelection,
      dispatch,
    } = this.props;

    return (
      <div className={styles.jobview}>
        <Row />
        <Row>
          <Col span={12}>
            input
            <MLJobOptionCreationPanel
              datasetList={datasetList}
              selectedDataset={selectedDataset}
              handleDatasetSelection={handleDatasetSelection}
            />
          </Col>
          <Col span={12}>result</Col>
        </Row>
      </div>
    );
  }
}

export default JobViewPanel;
