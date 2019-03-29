import React, { PureComponent } from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Select,
  Tooltip,
  Switch,
  Slider,
  InputNumber,
} from 'antd';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import styles from './index.less';

const Option = Select.Option;

class CustomizedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showValidation: false, showAdvanced: false };
  }

  render() {
    const { datasetList, selectedDataset, handleDatasetSelection } = this.props;
    const { getFieldDecorator } = this.props.form;

    let name = undefined;
    if (selectedDataset.name) {
      name = selectedDataset.name;
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
      this.setState({ ...this.state, showValidation: checked });
    };

    const onSwitchAdvanced = checked => {
      this.setState({ ...this.state, showAdvanced: checked });
    };

    const handleCreate = event => {
      event.preventDefault();
      console.log(this.props.form.getFieldsValue());
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };

    const formatterPercentage = value => {
      return `${value}%`;
    };

    return (
      <Form {...formItemLayout} onSubmit={handleCreate}>
        <Form.Item label="** Select Dataset">
          <DatasetListSelector
            datasetList={datasetList}
            queryList={[]}
            handleChange={handleDatasetSelection}
            selected={name}
          />
        </Form.Item>

        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please give your prediction a name' }],
          })(<Input placeholder="Please name your prediction job" />)}
        </Form.Item>

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

        <Form.Item label="Select Target">
          {getFieldDecorator('targets', {
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

        <Form.Item label="Show Validation Options">
          <Switch onChange={onSwitchValidation} />
        </Form.Item>

        {this.state.showValidation && (
          <div>
            <Form.Item label="Test Data Percentage">
              <Slider min={0} max={100} defaultValue={10} tipFormatter={formatterPercentage} />
            </Form.Item>

            <Form.Item label="Shuffle Data">
              <Checkbox defaultChecked />
            </Form.Item>

            <Form.Item label="Random Seed">
              <InputNumber min={1} max={100} size="small" defaultValue={42} />
            </Form.Item>
          </div>
        )}

        <Form.Item label="Show Advanced Options">
          <Switch onChange={onSwitchAdvanced} />
        </Form.Item>

        {this.state.showAdvanced && (
          <div>
            <Form.Item label="Time Limitation">
              <InputNumber min={1} max={3600} size="small" defaultValue={120} />
            </Form.Item>
            <Form.Item label="Time Limitation per Run">
              <InputNumber min={1} max={300} size="small" defaultValue={30} />
            </Form.Item>
            <Form.Item label="initial_configurations_via_metalearning">
              <InputNumber min={1} max={100} size="small" defaultValue={25} />
            </Form.Item>
            <Form.Item label="ensemble_size">
              <InputNumber min={1} max={100} size="small" defaultValue={50} />
            </Form.Item>
            <Form.Item label="ensemble_nbest">
              <InputNumber min={1} max={100} size="small" defaultValue={50} />
            </Form.Item>
            <Form.Item label="ensemble_memory_limit">
              <InputNumber min={1} max={16384} size="small" defaultValue={1024} />
            </Form.Item>
            <Form.Item label="ml_memory_limit">
              <InputNumber min={1} max={16384} size="small" defaultValue={2048} />
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

class MLJobOptionCreationPanel extends PureComponent {
  render() {
    const { datasetList, selectedDataset, handleDatasetSelection } = this.props;

    const CreationForm = Form.create({})(CustomizedForm);

    return (
      <CreationForm
        datasetList={datasetList}
        selectedDataset={selectedDataset}
        handleDatasetSelection={handleDatasetSelection}
      />
    );
  }
}

export default MLJobOptionCreationPanel;
