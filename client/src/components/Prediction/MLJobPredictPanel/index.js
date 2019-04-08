import React, { PureComponent } from 'react';
import { Row, Col, Form, Button, Empty, message } from 'antd';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import DatasetTable from '@/components/Dataset/DatasetTable';
import { predict } from '@/services/automl';

import { convertDataset } from '@/utils/dataset';

import styles from './index.less';

class MLJobPredictPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      result: null,
      loading: false,
    };
  }

  render() {
    const { datasetList, job, dispatch } = this.props;

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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const handleDatasetSelect = event => {
      this.setState({
        selected: event,
      });
    };

    const handlePredict = () => {
      const me = this;
      const payload = {};
      payload.data = this.state.selected;
      payload.jobid = job.id;
      payload.input_type = 'dataset';
      console.log(payload);
      const response = predict(payload);
      this.setState({
        loading: true,
      });
      response
        .then(function(event) {
          message.success('predition success!');
          const datatable = convertDataset(event);
          console.log(datatable);
          me.setState({
            loading: false,
            result: datatable,
          });
        })
        .catch(function(event) {
          message.success(`predition faile ${event}!`);
          me.setState({
            loading: false,
          });
        });
    };

    const buildPredictionResult = () => {
      if (this.state.result) {
        const { dataSource, columns } = this.state.result;
        return <DatasetTable dataSource={dataSource} columns={columns} />;
      } else {
        return <Empty />;
      }
    };

    return (
      <div className={styles.details}>
        <Row>
          <Col span={10}>
            <Form {...formItemLayout}>
              <Form.Item label="Prediction Job">{job.id}</Form.Item>
              <Form.Item label="Select Dataset">
                <DatasetListSelector
                  datasetList={datasetList}
                  queryList={[]}
                  handleChange={handleDatasetSelect}
                  selected={this.state.selected}
                />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button icon="search" onClick={handlePredict} loading={this.state.loading}>
                  Predict
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} offset={2}>
            {buildPredictionResult()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default MLJobPredictPanel;
