import React, { PureComponent } from 'react';
import { Row, Col, Button, Tooltip, message } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import GrammarConfigPanel from './GrammarConfigPanel';
import VisualizationPanel from './VisualizationPanel';

import { createDashboard } from '@/services/dashboard';

import styles from './index.less';

@connect(({ gchart, query, loading }) => ({
  gchart,
  query,
  loading: loading.effects['gchart/fetch'],
}))
class GrammerGraph extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gchart/fetch',
    });
  }

  render() {
    const { gchart, query, dispatch } = this.props;
    const { name } = gchart.currentDataset;

    const savedQueryList = [];
    for (const p in query.savedQuery) {
      savedQueryList.push({ name: query.savedQuery[p].name });
    }

    const handleChange = (value, type) => {
      if (type === 'dataset') {
        dispatch({
          type: 'gchart/fetchSelected',
          payload: value,
        });
      } else if (type === 'query') {
        const selectedQuery = query.savedQuery[value];
        dispatch({
          type: 'gchart/updateSelected',
          payload: selectedQuery,
        });
      }
    };

    const exportToDashboard = () => {
      const restParams = {};
      //TODO: add dialog to collect title
      restParams.title = 'test';
      restParams.description = 'test';
      if (gchart.currentDataset.type) {
        restParams.dataset = gchart.currentDataset.dataset;
        restParams.query = gchart.currentDataset.query;
        restParams.queryType = gchart.currentDataset.type;
      } else {
        restParams.dataset = gchart.currentDataset.name;
        restParams.query = '';
        restParams.queryType = undefined;
      }
      restParams.grammar = gchart.grammar;
      const payload = { restParams };
      createDashboard(payload);
      //TODO: handle rest failure;
      message.info('current visualization has been exported to dashboard!');
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.gchart}>
          <Row gutter={16} type="flex" justify="end">
            <Col span={6}>
              <div className={styles.ggHeader}>
                <Tooltip placement="top" title="export to dashboard">
                  <Button icon="export" shape="circle" onClick={exportToDashboard} />
                </Tooltip>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Row>
                Dataset:
                <DatasetListSelector
                  datasetList={gchart.list}
                  queryList={savedQueryList}
                  handleChange={handleChange}
                  selected={name}
                />
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <GrammarConfigPanel />
            </Col>
            <Col span={16}>
              <VisualizationPanel />
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default GrammerGraph;
