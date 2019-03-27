import React, { PureComponent } from 'react';
import { Row, Col , Table, Divider} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';


@connect(({ classification, loading }) => ({
  classification,
  loading: loading.effects['classification/fetchJobs'],
}))
class Categorical extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'classification/fetchJobs',
    });
  }

  render() {
    const { classification, dispatch } = this.props;

    const { jobs } = classification;

    const columns = [{
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => {
            return ('' + a.name).localeCompare(b.name);
          }
        },{
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          sorter: (a, b) => {
            return ('' + a.status).localeCompare(b.status);
          }
        },{
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },{
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">View</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        ),
      }]

    const tableData = jobs.map( job => {
      const item = {};
      item.id = job.id;
      item.name = job.name;
      item.status = job.status;
      item.type = job.type;
      item.key = job.id;
      return item;
    })
    
    return (
      <PageHeaderWrapper>
        <div className={styles.categorical}>
          Categorical
          <Row>
            <Table columns={columns} dataSource={tableData} />
          </Row>
        </div>

      </PageHeaderWrapper>
    )
  }
}

export default Categorical;
