import React, { PureComponent } from 'react';
import { Row, Modal, Empty } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MLJobTable from '@/components/Prediction/MLJobTable';
import MLJobControlPanel from '@/components/Prediction/MLJobControlPanel';
import MLJobDetailsPanel from '@/components/Prediction/MLJobDetailsPanel';
import MLJobPredictPanel from '@/components/Prediction/MLJobPredictPanel';
import MLJobOptionCreationPanel from '@/components/Prediction/MLJobOptionCreationPanel';

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
    dispatch({
      type: 'classification/fetchDatasets',
    });
    dispatch({
      type: 'classification/fetchConfig',
    });
  }

  render() {
    const { classification, dispatch } = this.props;
    const { jobs, view, selectedJob, datasetList, selectedDataset, config } = classification;
    const jobType = 'AutoClassificationJob';

    const jobConfig = { ...config };
    if (jobConfig && jobConfig.auto_ml_algorithms) {
      delete jobConfig.auto_ml_algorithms.regressors;
    }

    const onCreate = () => {
      dispatch({
        type: 'classification/createView',
      });
    };
    const onList = () => {
      dispatch({
        type: 'classification/fetchJobs',
      });
      dispatch({
        type: 'classification/listView',
      });
    };
    const onDelete = r => {
      Modal.confirm({
        title: 'Do you Want to delete this job?',
        content: `job ${r.name} will be deleted! `,
        onOk() {
          dispatch({
            type: 'classification/removeJob',
            payload: r.id,
          });
        },
      });
    };

    const onView = r => {
      const payload = {};
      payload.jobId = r.id;
      payload.view = 'detail';
      dispatch({
        type: 'classification/switchView',
        payload,
      });
    };

    const onPredict = r => {
      const payload = {};
      payload.jobId = r.id;
      payload.view = 'predict';
      dispatch({
        type: 'classification/switchView',
        payload,
      });
    };

    const handleDatasetSelection = event => {
      dispatch({
        type: 'classification/fetchDataset',
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
            type: 'classification/createMLJob',
            payload: event,
          });
        },
      });
    };

    const handleDetailRefresh = id => {
      const payload = {};
      payload.jobId = id;
      payload.view = 'detail';

      dispatch({
        type: 'classification/switchView',
        payload,
      });
    };

    const contentView = () => {
      if (view === 'list') {
        return <MLJobTable jobs={jobs} onView={onView} onDelete={onDelete} onPredict={onPredict} />;
      }
      if (view === 'create') {
        return (
          <MLJobOptionCreationPanel
            datasetList={datasetList}
            selectedDataset={selectedDataset}
            onDatasetSelect={handleDatasetSelection}
            onCreate={handelJobCreation}
            jobType={jobType}
            config={config}
          />
        );
      }
      if (view === 'detail') {
        return (
          <MLJobDetailsPanel job={selectedJob} onRefresh={handleDetailRefresh} config={jobConfig} />
        );
      }
      if (view === 'predict') {
        return <MLJobPredictPanel datasetList={datasetList} job={selectedJob} />;
      }
      return <Empty />;
    };

    return (
      <PageHeaderWrapper>
        <div>
          <Row>
            <MLJobControlPanel canList canCreate onList={onList} onCreate={onCreate} />
          </Row>
          <Row>{contentView()}</Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Categorical;
