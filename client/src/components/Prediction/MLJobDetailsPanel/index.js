import React, { PureComponent } from 'react';
import { Row, Col, Form, Statistic, Collapse, Icon } from 'antd';

import chartConfigs from '@/components/Visualization/ChartConfig';
import GGChart from '@/components/Visualization/GGChart';

import convertDataset from '@/utils/dataset';

import styles from './index.less';

const { Panel } = Collapse;
const { Countdown } = Statistic;
const refreshInterval = 10;

class MLJobDetailsPanel extends PureComponent {
  timer = null;

  componentDidMount() {
    const { job, onRefresh } = this.props;
    if (onRefresh) {
      this.timer = setInterval(function() {
        onRefresh(job.id);
      }, 1000 * refreshInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { job } = this.props;

    const {
      validation_result, // eslint-disable-line camelcase
      status,
      start_time, // eslint-disable-line camelcase
      end_time, // eslint-disable-line camelcase
      model_representation, // eslint-disable-line camelcase
      model_stats, // eslint-disable-line camelcase
      job_option, // eslint-disable-line camelcase
      validation_option, // eslint-disable-line camelcase
      ...jobDetails
    } = job;

    const validationResult = validation_result; // eslint-disable-line camelcase

    const jobType = jobDetails.type;

    const { time_left_for_this_task } = job_option; // eslint-disable-line camelcase
    const deadline = 1000 * time_left_for_this_task + 1000 * start_time + 1000 * refreshInterval; // eslint-disable-line camelcase

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

    // const details = JSON.stringify(job);
    if (status === 'SUCCESS' || status === 'FAILED') {
      clearInterval(this.timer);
    }

    const buildETA = () => {
      if (status !== 'SUCCESS' && status !== 'FAILED' && jobType !== 'TimeSerialsForecastsJob') {
        return (
          <Col span={8}>
            <Countdown title="ETA" value={deadline} format="HH:mm:ss:SSS" />
          </Col>
        );
      }

      return <Col span={8} />;
    };

    const buildStatusIcon = () => {
      if (status === 'SUCCESS') {
        return <Icon type="check" />;
      }
      if (status === 'FAILED') {
        return <Icon type="warning" />;
      }
      return <Icon type="loading" />;
    };

    const buildItems = obj => {
      const items = [];
      if (!obj) {
        return items;
      }

      Object.keys(obj).forEach(p => {
        if (obj[p] instanceof Object && !Array.isArray(obj[p])) {
          const childItems = buildItems(obj[p]);
          childItems.forEach(item => {
            items.push(item);
          });
        } else {
          items.push(
            <Form.Item label={p} key={p} className={styles.detailsItem}>
              <span className="ant-form-text">{String(obj[p])}</span>
            </Form.Item>
          );
        }
      });
      return items;
    };

    const buildValidationStats = obj => {
      const items = [];

      Object.keys(obj).forEach(p => {
        if (typeof obj[p] === 'number') {
          items.push(
            <Col span={8} key={p}>
              <Statistic title={p} value={obj[p]} />
            </Col>
          );
        }
      });
      return items;
    };

    const buildConfusionMatrix = obj => {
      if (!obj) {
        return null;
      }
      const confusionMatrix = obj.confusion_matrix;
      if (!confusionMatrix) {
        return null;
      }
      const data = [];
      confusionMatrix.lables.forEach(function(actual, actualIndex) {
        confusionMatrix.lables.reverse().forEach(function(predicted, predictedIndex) {
          const item = {};
          item.actual = `actual(${actual})`;
          item.predicted = `predicted(${predicted})`;
          const index = confusionMatrix.lables.length - predictedIndex - 1;
          item.value = confusionMatrix.value[actualIndex][index];
          data.push(item);
        });
      });
      const config = chartConfigs.find('heatmap');
      const feeds = {};
      feeds.x = 'actual';
      feeds.y = 'predicted';
      feeds.color = 'value';
      const grammar = config[0].build(feeds);
      return <GGChart grammar={grammar} data={data} />;
    };

    const buildTrendValidation = obj => {
      if (!obj) {
        return null;
      }
      const { forecast } = obj;
      if (!forecast) {
        return null;
      }
      const convertedDataset = convertDataset(forecast);
      console.log(convertedDataset);
      const { dataSource } = convertedDataset;
      const config = chartConfigs.find('trend');
      const feeds = {};
      feeds.time = 'ds';
      feeds.high = 'yhat_upper';
      feeds.low = 'yhat_lower';
      feeds.v1 = 'yhat';
      feeds.v2 = 'trend';
      const grammar = config[0].build(feeds);
      return <GGChart grammar={grammar} data={dataSource} />;
    };

    const jobContents = buildItems(jobDetails);
    const optionContents = buildItems(job_option);
    const validationContents = buildItems(validation_option);
    const confusionMatrix = buildConfusionMatrix(validationResult);
    const trendValidation = buildTrendValidation(validationResult);

    return (
      <div>
        <Row>
          <Col key="JobDetails" span={12}>
            <Collapse defaultActiveKey={['1']} className={styles.detailsPanel}>
              <Panel header="Job Info" key="1">
                <Form {...formItemLayout}>{jobContents}</Form>
              </Panel>
              {jobType !== 'TimeSerialsForecastsJob' && (
                <Panel header="Validation Options" key="2">
                  <Form {...formItemLayout}>{validationContents}</Form>
                </Panel>
              )}
              <Panel header="Job Options" key="3">
                <Form {...formItemLayout}>{optionContents}</Form>
              </Panel>
            </Collapse>
          </Col>
          <Col key="JobStats" span={12}>
            <Collapse defaultActiveKey={['1']} className={styles.detailsPanel}>
              <Panel header="Status" key="1">
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic title="Status" value={status} prefix={buildStatusIcon()} />
                  </Col>
                  {buildETA()}
                </Row>
                <Row gutter={16}>{validationResult && buildValidationStats(validationResult)}</Row>
                <Row gutter={16}>{confusionMatrix && confusionMatrix}</Row>
                <Row gutter={16}>{trendValidation && trendValidation}</Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MLJobDetailsPanel;
