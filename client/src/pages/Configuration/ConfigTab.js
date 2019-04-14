import React, { PureComponent } from 'react';
import { Table, Form, Input } from 'antd';
import { connect } from 'dva';

import styles from './ConfigTab.less';

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class ConfigTab extends PureComponent {
  render() {
    const { data, handleChange, dispatch } = this.props;
    const handleSave = row => {
      handleChange(row);
    };

    const buildTabContent = val => {
      const data = [];
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
      for (const section in val) {
        for (const item in val[section]) {
          const content = {};
          content.section = section;
          content.key = section + item;
          content.item = item;
          content.value = val[section][item];
          data.push(content);
        }
      }

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
      return <Table components={components} columns={columns} dataSource={data} size="small" />;
    };

    return buildTabContent(data);
  }
}

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, index, handleSave, ...restProps } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className={styles.editableCellValueWrap}
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

export default ConfigTab;
