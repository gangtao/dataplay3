import React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

// eslint-disable-next-line react/prefer-stateless-function
class ContentForm extends React.Component {
  render() {
    const { payload, form } = this.props;
    const { getFieldDecorator } = form;
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

    return (
      <Form {...formItemLayout}>
        <Form.Item label="Query">
          {getFieldDecorator('query', {
            rules: [{ required: true, message: 'dataset query' }],
            initialValue: payload.query,
          })(<Input disabled />)}
        </Form.Item>

        <Form.Item label="Source Dataset">
          {getFieldDecorator('source_dataset_id', {
            rules: [{ required: true, message: 'source dataset id' }],
            initialValue: payload.dataset,
          })(<Input disabled />)}
        </Form.Item>

        <Form.Item label="Query Type">
          {getFieldDecorator('query_type', {
            rules: [{ required: true, message: 'query type' }],
            initialValue: payload.type,
          })(<Input disabled />)}
        </Form.Item>

        <Form.Item label="Created Dataset ID">
          {getFieldDecorator('dataset_id', {
            rules: [{ required: true, message: 'Please give your dataset an id' }],
            initialValue: payload.name,
          })(<Input placeholder="Please give your dataset an id" />)}
        </Form.Item>

        <Form.Item label="Created Dataset Name">
          {getFieldDecorator('dataset_name', {
            rules: [{ required: true, message: 'Please give your dataset a name' }],
            initialValue: payload.name,
          })(<Input placeholder="Please give your dataset a name" />)}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('dataset_description', {
            rules: [{ required: false, message: 'Please describe your dataset' }],
          })(<TextArea rows={3} placeholder="Please describe your dataset" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default ContentForm;
