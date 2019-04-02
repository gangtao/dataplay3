import React, { PureComponent } from 'react';
import { Row, Col, Tabs, Table, Divider, Empty } from 'antd';

import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const TabPane = Tabs.TabPane;

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
              // TODO delete the selected dataset
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
              // TODO delete the selected dataset
            };

            const callExport = () => {
              // TODO export the selected query
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
        const item = {};
        item.query = source.rawQuery;
        item.name = source.name;
        item.type = source.type;
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
