import React, { PureComponent } from 'react';
import { Row, Form, Button, Empty, Divider, message } from 'antd';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import DatasetTable from '@/components/Dataset/DatasetTable';
import { predict } from '@/services/automl';

import convertDataset from '@/utils/dataset';

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
    const { datasetList, job } = this.props;
    const { loading, selected, result } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
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
          offset: 2,
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
      payload.data = selected;
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
      if (result) {
        const { dataSource, columns } = result;
        return <DatasetTable dataSource={dataSource} columns={columns} />;
      }
      return <Empty />;
    };

    return (
      <div>
        <Row>
          <Form {...formItemLayout}>
            <Form.Item label="Prediction Job">{job.id}</Form.Item>
            <Form.Item label="Select Dataset">
              <DatasetListSelector
                datasetList={datasetList}
                queryList={[]}
                handleChange={handleDatasetSelect}
                selected={selected}
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button icon="search" onClick={handlePredict} loading={loading}>
                Predict
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row>
          <Divider orientation="left" />
          {buildPredictionResult()}
        </Row>
      </div>
    );
  }
}

export default MLJobPredictPanel;
