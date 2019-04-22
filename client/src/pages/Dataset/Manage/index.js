import React, { PureComponent } from 'react';
import { Tabs, Table, Divider, Empty, Modal, Form, message } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { query2dataset } from '@/services/dataset';
import ContentForm from './ContentForm';

const { TabPane } = Tabs;
const { confirm } = Modal;

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
                <a onClick={callView}>View</a>
                <Divider type="vertical" />
                <a onClick={callDelete}>Delete</a>
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
              const CreationForm = Form.create()(ContentForm);
              const wrapper = {};
              const exportForm = (
                <CreationForm
                  payload={record}
                  wrappedComponentRef={form => {
                    wrapper.form = form;
                  }}
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
                      return new Promise(() => {
                        const response = query2dataset(payload);
                        console.log(response);
                        message.success(`query ${record.name} has been exported to dataset!`);
                      }).catch(() => {
                        message.error(`query ${record.name} failed to export!`);
                      });
                    }
                    return new Promise(() => {
                      message.error(`query ${record.name} failed to validate!!`);
                    });
                  });
                },
                onCancel() {},
              });
            };

            return (
              <span>
                <a onClick={callView}>View</a>
                <Divider type="vertical" />
                <a onClick={callDelete}>Delete</a>
                <Divider type="vertical" />
                <a onClick={callExport}>Export as Dataset</a>
              </span>
            );
          },
        },
      ];

      if (!query || !query.savedQuery) {
        return <Empty />;
      }

      const data = [];
      Object.keys(query.savedQuery).forEach(key => {
        const source = query.savedQuery[key];
        const item = { ...source };
        data.push(item);
      });
      return <Table columns={columns} dataSource={data} />;
    };

    return (
      <PageHeaderWrapper>
        <div>
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
