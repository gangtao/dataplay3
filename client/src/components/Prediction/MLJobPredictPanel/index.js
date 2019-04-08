import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import styles from './index.less';

class MLJobPredictPanel extends PureComponent {
  render() {
    const { job, dispatch } = this.props;

    const {
      validation_result,
      status,
      start_time,
      end_time,
      model_representation,
      model_stats,
      job_option,
      validation_option,
      ...jobDetails
    } = job;

    return (
      <div className={styles.details}>
        <Row>predict</Row>
      </div>
    );
  }
}

export default MLJobPredictPanel;
