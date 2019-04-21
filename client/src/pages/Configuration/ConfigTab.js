import React, { PureComponent } from 'react';
import { Table } from 'antd';

import { EditableCell, EditableFormRow } from './EditableCell';

class ConfigTab extends PureComponent {
  render() {
    const { data, handleChange } = this.props;
    const handleSave = row => {
      handleChange(row);
    };

    const buildTabContent = val => {
      const dataSource = [];
      let columns = [
        {
          title: 'section',
          dataIndex: 'section',
          key: 'section',
        },
        {
          title: 'item',
          dataIndex: 'item',
          key: 'item',
        },
        {
          title: 'value',
          dataIndex: 'value',
          key: 'value',
          editable: true,
        },
      ];
      Object.keys(val).forEach(section => {
        Object.keys(val[section]).forEach(item => {
          const content = {};
          content.section = section;
          content.key = section + item;
          content.item = item;
          content.value = val[section][item];
          dataSource.push(content);
        });
      });

      columns = columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
      });
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      return (
        <Table components={components} columns={columns} dataSource={dataSource} size="small" />
      );
    };

    return buildTabContent(data);
  }
}

export default ConfigTab;
