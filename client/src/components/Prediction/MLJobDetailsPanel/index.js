import React, { PureComponent } from 'react';
import { Row, Col, Form, Card, Statistic, Collapse } from 'antd';

import styles from './index.less';

const Panel = Collapse.Panel;

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

    const buildValidationStats = obj => {
      let items = [];
      for (const p in obj) {
        items.push(
          <Col span={8}>
            <Statistic title={p} value={obj[p]} />
          </Col>
        );
      }
      return items;
    };

    const jobContents = buildItems(jobDetails);
    const optionContents = buildItems(job_option);
    const validationContents = buildItems(validation_option);

    return (
      <div className={styles.details}>
        <Row>
          <Col span={12}>
            <Collapse defaultActiveKey={['1']} className={styles.detailsPanel}>
              <Panel header="Job Info" key="1">
                <Form {...formItemLayout}>{jobContents}</Form>
              </Panel>
              <Panel header="Validation Options" key="2">
                <Form {...formItemLayout}>{validationContents}</Form>
              </Panel>
              <Panel header="Job Options" key="3">
                <Form {...formItemLayout}>{optionContents}</Form>
              </Panel>
            </Collapse>
          </Col>
          <Col span={12}>
            <Collapse defaultActiveKey={['1']} className={styles.detailsPanel}>
              <Panel header="Status" key="1">
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic title="Status" value={status} />
                  </Col>
                  {validation_result && buildValidationStats(validation_result)}
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MLJobDetailsPanel;
