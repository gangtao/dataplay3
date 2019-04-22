import React from 'react';
import { Form, Input, Button, Checkbox, Select, Switch, Slider, InputNumber } from 'antd';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

const { Option } = Select;

class CustomizedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showValidation: false, showAdvanced: false };
  }

  render() {
    const {
      datasetList,
      selectedDataset,
      onDatasetSelect,
      onCreate,
      jobType,
      config,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const { showValidation, showAdvanced } = this.state;

    const isAutoMLJob = jobType === 'AutoRegressionJob' || jobType === 'AutoClassificationJob';
    const isTimeForcastJob = jobType === 'TimeSerialsForecastsJob';
    // const featureNumber = isTimeForcastJob ? 'single' : 'multiple';
    let datasetName;
    if (selectedDataset.name) {
      datasetName = selectedDataset.name;
    }

    let fieldsOptions = [];
    if (selectedDataset.cols) {
      fieldsOptions = selectedDataset.cols.map(item => {
        return <Option key={item}>{item}</Option>;
      });
    }

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

    const onSwitchValidation = checked => {
      this.setState(prevState => ({ ...prevState, showValidation: checked }));
    };

    const onSwitchAdvanced = checked => {
      this.setState(prevState => ({ ...prevState, showAdvanced: checked }));
    };

    const handleCreate = event => {
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const payload = { ...values };
          payload.dataset = datasetName;
          payload.targets = [payload.target];
          if (isTimeForcastJob) {
            payload.features = [payload.features];
          }
          if (payload.validation_option) {
            payload.validation_option.test_size /= 100;
            payload.validation_option.random_state = parseInt(
              payload.validation_option.random_state,
              10
            );
          }
          onCreate(payload);
        }
      });
    };

    const formatterPercentage = value => {
      return `${value}%`;
    };

    return (
      <Form {...formItemLayout} onSubmit={handleCreate}>
        <Form.Item label="Job Type">
          <span className="ant-form-text">{jobType}</span>
        </Form.Item>

        <Form.Item label="** Select Dataset">
          <DatasetListSelector
            datasetList={datasetList}
            queryList={[]}
            handleChange={onDatasetSelect}
            selected={datasetName}
          />
        </Form.Item>

        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please give your prediction a name' }],
          })(<Input placeholder="Please name your prediction job" />)}
        </Form.Item>

        {isAutoMLJob && (
          <Form.Item label="Select Features">
            {getFieldDecorator('features', {
              rules: [{ required: true, message: 'Please give features', type: 'array' }],
            })(
              <Select
                size="default"
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select features used for your prediction job"
              >
                {fieldsOptions}
              </Select>
            )}
          </Form.Item>
        )}

        {isTimeForcastJob && (
          <Form.Item label="Select Timestamp Feature">
            {getFieldDecorator('features', {
              rules: [{ required: true, message: 'Please select feature' }],
            })(
              <Select
                size="default"
                style={{ width: '100%' }}
                placeholder="Please select timestamp used for your prediction job"
              >
                {fieldsOptions}
              </Select>
            )}
          </Form.Item>
        )}

        <Form.Item label="Select Target">
          {getFieldDecorator('target', {
            rules: [{ required: true, message: 'Please give target' }],
          })(
            <Select
              size="default"
              style={{ width: '100%' }}
              placeholder="Please select target for your prediction job"
            >
              {fieldsOptions}
            </Select>
          )}
        </Form.Item>

        {isAutoMLJob && (
          <Form.Item label="Set Validation Options">
            <Switch onChange={onSwitchValidation} />
          </Form.Item>
        )}

        {showValidation && isAutoMLJob && (
          <div>
            <Form.Item label="Test Data Percentage">
              {getFieldDecorator('validation_option.test_size', {
                initialValue: parseFloat(config.validation_option.test_size, 10) * 100,
              })(<Slider min={0} max={100} tipFormatter={formatterPercentage} />)}
            </Form.Item>

            <Form.Item label="Shuffle Data">
              {getFieldDecorator('validation_option.shuffle', {
                initialValue: config.validation_option.shuffle,
              })(<Checkbox defaultChecked />)}
            </Form.Item>

            <Form.Item label="Random Seed">
              {getFieldDecorator('validation_option.random_state', {
                initialValue: config.validation_option.random_state,
              })(<InputNumber min={1} max={100} size="small" />)}
            </Form.Item>
          </div>
        )}

        <Form.Item label="Set Advanced Options">
          <Switch onChange={onSwitchAdvanced} />
        </Form.Item>

        {showAdvanced && isAutoMLJob && (
          <div>
            <Form.Item label="Time Limitation">
              {getFieldDecorator('job_option.time_left_for_this_task', {
                initialValue: parseInt(config.auto_ml.time_left_for_this_task, 10),
              })(<InputNumber min={1} max={3600} size="small" />)}
            </Form.Item>
            <Form.Item label="Time Limitation per Run">
              {getFieldDecorator('job_option.per_run_time_limit', {
                initialValue: parseInt(config.auto_ml.per_run_time_limit, 10),
              })(<InputNumber min={1} max={300} size="small" />)}
            </Form.Item>
            <Form.Item label="initial_configurations_via_metalearning">
              {getFieldDecorator('job_option.initial_configurations_via_metalearning', {
                initialValue: parseInt(config.auto_ml.initial_configurations_via_metalearning, 10),
              })(<InputNumber min={1} max={100} size="small" />)}
            </Form.Item>
            <Form.Item label="ensemble_size">
              {getFieldDecorator('job_option.ensemble_size', {
                initialValue: parseInt(config.auto_ml.ensemble_size, 10),
              })(<InputNumber min={1} max={100} size="small" />)}
            </Form.Item>
            <Form.Item label="ensemble_nbest">
              {getFieldDecorator('job_option.ensemble_nbest', {
                initialValue: parseInt(config.auto_ml.ensemble_nbest, 10),
              })(<InputNumber min={1} max={100} size="small" />)}
            </Form.Item>
            <Form.Item label="ensemble_memory_limit">
              {getFieldDecorator('job_option.ensemble_memory_limit', {
                initialValue: parseInt(config.auto_ml.ensemble_memory_limit, 10),
              })(<InputNumber min={1} max={16384} size="small" />)}
            </Form.Item>
            <Form.Item label="ml_memory_limit">
              {getFieldDecorator('job_option.ml_memory_limit', {
                initialValue: parseInt(config.auto_ml.ml_memory_limit, 10),
              })(<InputNumber min={1} max={16384} size="small" />)}
            </Form.Item>
          </div>
        )}

        {showAdvanced && isTimeForcastJob && (
          <div>
            <Form.Item label="Time Format string">
              {getFieldDecorator('job_option.time_format', {})(
                <Input size="small" placeholder="YYYY-MM-DD HH:MM:SS" />
              )}
            </Form.Item>
          </div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CustomizedForm;
