import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import MLJobOptionCreationPanel from '@/components/Prediction/MLJobOptionCreationPanel';
import MLJobDetailsPanel from '@/components/Prediction/MLJobDetailsPanel';

import styles from './index.less';

class MLJobViewPanel extends PureComponent {
  render() {
    const {
      isCreation,
      datasetList,
      selectedDataset,
      onDatasetSelect,
      onJobCreate,
      onRefreshDetails,
      jobType,
      selectedJob,
      dispatch,
    } = this.props;

    return (
      <div className={styles.jobview}>
        <Row>
          <Col>
            {isCreation ? (
              <MLJobOptionCreationPanel
                datasetList={datasetList}
                selectedDataset={selectedDataset}
                onDatasetSelect={onDatasetSelect}
                onCreate={onJobCreate}
                jobType={jobType}
              />
            ) : (
              <MLJobDetailsPanel job={selectedJob} onRefresh={onRefreshDetails} />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default MLJobViewPanel;
