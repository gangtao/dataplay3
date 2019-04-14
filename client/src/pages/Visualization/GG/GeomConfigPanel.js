import React, { PureComponent } from 'react';
import { Select, Form } from 'antd';

import styles from './GeomConfigPanel.less';

const { Option } = Select;

class GeomConfigPanel extends PureComponent {
  render() {
    const { geomKey, cols, handleUpdate, geomValues } = this.props;
    const fields = [];
    if (cols) {
      cols.map(col => fields.push(col.key));
    }

    const fieldsList = fields.map(value => {
      return <Option key={value}>{value}</Option>;
    });

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const geomTypeListStr = [
      'point',
      'path',
      'line',
      'area',
      'interval',
      'intervalStack',
      'polygon',
      'schema',
      'edge',
      'heatmap',
    ];
    const geomTypeList = geomTypeListStr.map(value => {
      return <Option key={value}>{value}</Option>;
    });

    const geomAttributes = ['position', 'color', 'size', 'shape', 'opacity', 'label'];

    const buildSelect = (type, children, single, selected) => {
      const hint = `Select ${type}`;
      const handleChange = value => {
        handleUpdate(type, value, geomKey);
      };
      return (
        <Select
          showSearch
          mode={single ? '' : 'tags'}
          placeholder={hint}
          onChange={handleChange}
          style={{ width: '100%' }}
          value={selected}
        >
          {children}
        </Select>
      );
    };

    const geomTypeSelected = geomValues && geomValues.geometry ? geomValues.geometry : [];
    const geomTypeSelector = buildSelect('geometry', geomTypeList, true, geomTypeSelected);

    const geomAttributesSelectors = geomAttributes.map(attr => {
      const selected = geomValues && geomValues[attr] ? geomValues[attr] : [];
      const content = buildSelect(attr, fieldsList, false, selected);
      return (
        <Form.Item key={attr} label={attr}>
          {content}
        </Form.Item>
      );
    });

    return (
      <div className={styles.geomConfigPanel}>
        <Form {...formItemLayout}>
          <Form.Item label="geometry">{geomTypeSelector}</Form.Item>
          {geomAttributesSelectors}
        </Form>
      </div>
    );
  }
}

export default GeomConfigPanel;
