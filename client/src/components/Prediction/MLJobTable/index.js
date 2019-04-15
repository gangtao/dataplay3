import React, { PureComponent } from 'react';
import { Table, Divider, message } from 'antd';

class MLJobTable extends PureComponent {
  render() {
    const { jobs, onDelete, onView, onPredict } = this.props;

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
        sorter: (a, b) => {
          return `${a.name}`.localeCompare(b.name);
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => {
          return `${a.status}`.localeCompare(b.status);
        },
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          const callView = () => {
            onView(record);
          };

          const callDelete = () => {
            onDelete(record);
          };

          const callPredict = () => {
            onPredict(record);
          };

          const callDeploy = () => {
            message.error('model deployment is not implemented!');
          };

          return (
            <span>
              <a onClick={callView}>View</a>
              <Divider type="vertical" />
              <a onClick={callPredict}>Predict</a>
              <Divider type="vertical" />
              <a onClick={callDeploy}>Deploy</a>
              <Divider type="vertical" />
              <a onClick={callDelete}>Delete</a>
            </span>
          );
        },
      },
    ];

    const tableData = jobs.map(job => {
      const item = {};
      item.id = job.id;
      item.name = job.name;
      item.status = job.status;
      item.type = job.type;
      item.key = job.id;
      return item;
    });

    return <Table columns={columns} dataSource={tableData} />;
  }
}

export default MLJobTable;
