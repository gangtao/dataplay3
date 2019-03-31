import React, { PureComponent } from 'react';
import { Row, Col, Form } from 'antd';

import styles from './index.less';

class MLJobDetailsPanel extends PureComponent {
  render() {
    const { job, dispatch } = this.props;

    const { validation_result, status, job_option, validation_option, ...jobDetails } = job;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const details = JSON.stringify(job);
    const buildItems = obj => {
      let items = [];
      for (const p in obj) {
        if (obj[p] instanceof Object && !Array.isArray(obj[p])) {
          const childItems = buildItems(obj[p]);
          childItems.map(item => {
            items.push(item);
          });
        } else {
          items.push(
            <Form.Item label={p} className={styles.detailsItem}>
              <span className="ant-form-text">{String(obj[p])}</span>
            </Form.Item>
          );
        }
      }
      return items;
    };

    const contents = buildItems(jobDetails);

    return (
      <div className={styles.details}>
        <Row>
          <Form {...formItemLayout}>{contents}</Form>
        </Row>
      </div>
    );
  }
}

export default MLJobDetailsPanel;
