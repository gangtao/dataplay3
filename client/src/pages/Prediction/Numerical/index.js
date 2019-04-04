import React, { PureComponent } from 'react';
import { Row, Col, Button, Modal, Empty } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MLJobTable from '@/components/Prediction/MLJobTable';
import MLJobControlPanel from '@/components/Prediction/MLJobControlPanel';

import MLJobViewPanel from '@/components/Prediction/MLJobViewPanel';

import styles from './index.less';

@connect(({ regression, loading }) => ({
  regression,
  loading: loading.effects['regression/fetchJobs'],
}))
class Numerical extends PureComponent {
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
    const jobType = 'AutoRegressionJob';

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
        type: 'regression/switchDetailView',
        payload: r.id,
      });
    };

    const handleDatasetSelection = event => {
      dispatch({
        type: 'regression/fetchDataset',
        payload: event,
      });
    };

    const handelJobCreation = event => {
      event.type = jobType;
      Modal.confirm({
        title: 'Do you Want to create this job?',
        content: `job ${event.name} will be created! `,
        onOk() {
          dispatch({
            type: 'regression/createMLJob',
            payload: event,
          });
        },
      });
    };

    const handleDetailRefresh = id => {
      dispatch({
        type: 'regression/switchDetailView',
        payload: id,
      });
    };

    const contentView = () => {
      if (view == 'list') {
        return <MLJobTable jobs={jobs} onView={onView} onDelete={onDelete} />;
      } else if (view == 'create') {
        return (
          <MLJobViewPanel
            isCreation={true}
            datasetList={datasetList}
            selectedDataset={selectedDataset}
            onDatasetSelect={handleDatasetSelection}
            onJobCreate={handelJobCreation}
            jobType={jobType}
          />
        );
      } else if (view == 'detail') {
        return (
          <MLJobViewPanel
            isCreation={false}
            jobType={jobType}
            selectedJob={selectedJob}
            onRefreshDetails={handleDetailRefresh}
          />
        );
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

export default Numerical;
