import React, { PureComponent } from 'react';
import { Row, Col, Button, Modal, Empty } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MLJobTable from '@/components/Prediction/MLJobTable';
import MLJobControlPanel from '@/components/Prediction/MLJobControlPanel';

import JobViewPanel from './JobViewPanel';

import styles from './index.less';

@connect(({ regression, loading }) => ({
  regression,
  loading: loading.effects['regression/fetchJobs'],
}))
class Categorical extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'regression/fetchJobs',
    });
    dispatch({
      type: 'regression/fetchDatasets',
    });
  }

  render() {
    const { regression, dispatch } = this.props;

    const { jobs, view, selectedJob, datasetList, selectedDataset } = regression;

    const onCreate = () => {
      dispatch({
        type: 'regression/createView',
      });
    };
    const onList = () => {
      dispatch({
        type: 'regression/listView',
      });
    };
    const onDelete = r => {
      Modal.confirm({
        title: 'Do you Want to delete this job?',
        content: `job ${r.name} will be deleted! `,
        onOk() {
          dispatch({
            type: 'regression/deleteJob',
            payload: r.id,
          });
        },
      });
    };
    const onView = r => {
      dispatch({
        type: 'regression/detailView',
        payload: r,
      });
    };

    const handleDatasetSelection = event => {
      console.log(event);
      console.log('data selected!');
      dispatch({
        type: 'regression/fetchDataset',
        payload: event,
      });
    };

    const contentView = () => {
      if (view == 'list') {
        return <MLJobTable jobs={jobs} onView={onView} onDelete={onDelete} />;
      } else if (view == 'create') {
        return (
          <JobViewPanel
            isCreate={true}
            datasetList={datasetList}
            selectedDataset={selectedDataset}
            handleDatasetSelection={handleDatasetSelection}
          />
        );
      } else if (view == 'detail') {
        return <JobViewPanel isCreate={false} />;
      } else {
        return <Empty />;
      }
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.numerical}>
          <Row>
            <MLJobControlPanel
              canList={true}
              canCreate={true}
              onList={onList}
              onCreate={onCreate}
            />
          </Row>
          <Row>{contentView()}</Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Categorical;
