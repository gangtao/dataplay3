import React, { PureComponent } from 'react';
import { Row, Col, Select } from 'antd';

import styles from './index.less';

const { Option } = Select;

class Dataset extends PureComponent {
  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    function handleBlur() {
      console.log('blur');
    }

    function handleFocus() {
      console.log('focus');
    }

    return (
      <div className={styles.dataset}>
        <Row gutter={16}>
          <Col span={8}>
            {' '}
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a dataset"
              optionFilterProp="children"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            ,
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dataset;
