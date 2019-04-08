import React, { PureComponent } from 'react';
import { Row, Col, Tabs, Table, Divider, Empty, Modal, Form, Input, Button, message } from 'antd';

import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

import { query2dataset } from '@/services/dataset';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const { TextArea } = Input;

class CustomizedContentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { payload } = this.props;
    const { getFieldDecorator } = this.props.form;
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
          })(<Input disabled={true} />)}
        </Form.Item>

        <Form.Item label="Source Dataset">
          {getFieldDecorator('source_dataset_id', {
            rules: [{ required: true, message: 'source dataset id' }],
            initialValue: payload.dataset,
          })(<Input disabled={true} />)}
        </Form.Item>

        <Form.Item label="Query Type">
          {getFieldDecorator('query_type', {
            rules: [{ required: true, message: 'query type' }],
            initialValue: payload.type,
          })(<Input disabled={true} />)}
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

@connect(({ dataset, query, loading }) => ({
  dataset,
  query,
  loading: loading.effects['dataset/fetch'],
}))
class Manage extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataset/fetch',
    });
  }

  render() {
    const { dataset, query, dispatch, history } = this.props;

    const buildDatasetTable = () => {
      const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => {
            const callView = () => {
              dispatch({
                type: 'dataset/fetchSelected',
                payload: record.id,
              });
              history.push('/dataset/view');
            };

            const callDelete = () => {
              confirm({
                title: `Do you want to delete dataset ${record.name}?`,
                content: `When clicked the OK button, dataset ${record.name} will be deleted!`,
                onOk() {
                  dispatch({
                    type: 'dataset/deleteSelected',
                    payload: record.id,
                  });
                },
              });
            };

            return (
              <span>
                <a href="javascript:;" onClick={callView}>
                  View
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={callDelete}>
                  Delete
                </a>
              </span>
            );
          },
        },
      ];

      if (!dataset || !dataset.list) {
        return <Empty />;
      }
      const data = dataset.list;
      return <Table columns={columns} dataSource={data} />;
    };

    const buildQueryTable = () => {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Query',
          dataIndex: 'query',
          key: 'query',
        },
        {
          title: 'Dataset',
          dataIndex: 'dataset',
          key: 'dataset',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => {
            const callView = () => {
              const selectedQuery = query.savedQuery[record.name];
              dispatch({
                type: 'dataset/updateSelected',
                payload: selectedQuery,
              });
              history.push('/dataset/view');
            };

            const callDelete = () => {
              confirm({
                title: `Do you want to delete query ${record.name}?`,
                content: `When clicked the OK button, query ${record.name} will be deleted!`,
                onOk() {
                  dispatch({
                    type: 'query/deleteQuery',
                    payload: record.name,
                  });
                },
              });
            };

            const callExport = () => {
              const CreationForm = Form.create()(CustomizedContentForm);
              const wrapper = {};
              const exportForm = (
                <CreationForm
                  payload={record}
                  wrappedComponentRef={form => (wrapper.form = form)}
                />
              );

              confirm({
                title: 'Do you want to export this query as dataset?',
                content: exportForm,
                width: 600,
                onOk() {
                  wrapper.form.props.form.validateFields((err, values) => {
                    if (!err) {
                      const payload = { ...values };
                      return new Promise((resolve, reject) => {
                        const response = query2dataset(payload);
                        message.success(`query ${record.name} has been exported to dataset!`);
                      }).catch(() => {
                        message.error(`query ${record.name} failed to export!`);
                      });
                    }
                  });
                },
                onCancel() {},
              });
            };

            return (
              <span>
                <a href="javascript:;" onClick={callView}>
                  View
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={callDelete}>
                  Delete
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={callExport}>
                  Export as Dataset
                </a>
              </span>
            );
          },
        },
      ];

      if (!query || !query.savedQuery) {
        return <Empty />;
      }

      let data = [];
      for (const p in query.savedQuery) {
        const source = query.savedQuery[p];
        const item = { ...source };
        data.push(item);
      }
      return <Table columns={columns} dataSource={data} />;
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.managePanel}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Dataset" key="1">
              {buildDatasetTable()}
            </TabPane>
            <TabPane tab="Query" key="2">
              {buildQueryTable()}
            </TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Manage;
