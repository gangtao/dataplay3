import React, { PureComponent } from 'react';
import { Row, Modal, Empty } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MLJobTable from '@/components/Prediction/MLJobTable';
import MLJobControlPanel from '@/components/Prediction/MLJobControlPanel';
import MLJobDetailsPanel from '@/components/Prediction/MLJobDetailsPanel';
import MLJobPredictPanel from '@/components/Prediction/MLJobPredictPanel';
import MLJobOptionCreationPanel from '@/components/Prediction/MLJobOptionCreationPanel';

@connect(({ timeserials, loading }) => ({
  timeserials,
  loading: loading.effects['timeserials/fetchJobs'],
}))
class TimeSerial extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'timeserials/fetchJobs',
    });
    dispatch({
      type: 'timeserials/fetchDatasets',
    });
  }

  render() {
    const { timeserials, dispatch } = this.props;
    const { jobs, view, selectedJob, datasetList, selectedDataset, config } = timeserials;
    const jobType = 'TimeSerialsForecastsJob';

    const jobConfig = {};

    const onCreate = () => {
      dispatch({
        type: 'timeserials/createView',
      });
    };
    const onList = () => {
      dispatch({
        type: 'timeserials/listView',
      });
    };
    const onDelete = r => {
      Modal.confirm({
        title: 'Do you Want to delete this job?',
        content: `job ${r.name} will be deleted! `,
        onOk() {
          dispatch({
            type: 'timeserials/removeJob',
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
        type: 'timeserials/switchView',
        payload,
      });
    };

    const onPredict = r => {
      const payload = {};
      payload.jobId = r.id;
      payload.view = 'predict';
      dispatch({
        type: 'timeserials/switchView',
        payload,
      });
    };

    const handleDatasetSelection = event => {
      dispatch({
        type: 'timeserials/fetchDataset',
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
            type: 'timeserials/createMLJob',
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
        type: 'timeserials/switchView',
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

export default TimeSerial;
