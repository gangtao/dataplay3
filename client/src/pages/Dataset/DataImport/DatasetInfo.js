import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
import { connect } from 'dva';

import styles from './DatasetInfo.less';

const { TextArea } = Input;

@connect(({ dataimport }) => ({
  dataimport,
}))
class DatasetInfo extends PureComponent {
  render() {
    const { dataimport, dispatch } = this.props;
    const { dataset } = dataimport;

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

    const handleNameChange = e => {
      const payload = {};
      payload.name = e.target.value;
      dispatch({
        type: 'dataimport/updateDatasetInfo',
        payload,
      });
    };

    const handleDescriptionChange = e => {
      const payload = {};
      payload.description = e.target.value;
      dispatch({
        type: 'dataimport/updateDatasetInfo',
        payload,
      });
    };

    return (
      <div className={styles.datasetInfo}>
        <Form {...formItemLayout}>
          <Form.Item label="Name">
            <Input defaultValue={dataset.name} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item label="Type">
            <Input disabled defaultValue={dataset.type} />
          </Form.Item>
          <Form.Item label="File">
            <Input disabled defaultValue={dataset.content} />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea defaultValue={dataset.description} onChange={handleDescriptionChange} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default DatasetInfo;
