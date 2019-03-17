import React, { PureComponent } from 'react';
import { Row, Col, Button, Tooltip, message } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import ChartTypeSelector from './ChartTypeSelector';
import VisualizationPanel from './VisualizationPanel';
import ChartFeedPanel from './ChartFeedPanel';

import { createDashboard } from '@/services/dashboard';

import styles from './index.less';

@connect(({ tchart, query, loading }) => ({
  tchart,
  query,
  loading: loading.effects['tchart/fetch'],
}))
class TypeDrivenChart extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tchart/fetch',
    });
  }

  render() {
    const { tchart, query, dispatch } = this.props;
    const { currentDataset, chartType } = tchart;
    const { name } = currentDataset;

    const savedQueryList = [];
    for (const p in query.savedQuery) {
      savedQueryList.push({ name: query.savedQuery[p].name });
    }

    const handleChange = (value, type) => {
      if (type === 'dataset') {
        dispatch({
          type: 'tchart/fetchSelected',
          payload: value,
        });
      } else if (type === 'query') {
        const selectedQuery = query.savedQuery[value];
        dispatch({
          type: 'tchart/updateSelected',
          payload: selectedQuery,
        });
      }
    };

    const handleChartSelected = value => {
      dispatch({
        type: 'tchart/updateType',
        payload: value,
      });
      dispatch({
        type: 'tchart/updateGrammar',
        payload: {},
      });
      // TODO : update the grammar to update the chart when switch type
    };

    const exportToDashboard = () => {
      const restParams = {};
      //TODO: add dialog to collect title
      restParams.title = 'test';
      restParams.description = 'test';
      if (tchart.currentDataset.type) {
        restParams.dataset = tchart.currentDataset.dataset;
        restParams.query = tchart.currentDataset.query;
        restParams.queryType = tchart.currentDataset.type;
      } else {
        restParams.dataset = tchart.currentDataset.name;
        restParams.query = '';
        restParams.queryType = undefined;
      }
      restParams.grammar = tchart.grammar;
      const payload = { restParams };
      createDashboard(payload);
      //TODO: handle rest failure;
      message.info('current visualization has been exported to dashboard!');
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.td}>
          <Row gutter={16} type="flex" justify="end">
            <Col span={6}>
              <div className={styles.tdHeader}>
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
                  datasetList={tchart.list}
                  queryList={savedQueryList}
                  handleChange={handleChange}
                  selected={name}
                />
              </Row>
              <Row>
                Chart Type:
                <ChartTypeSelector handleChange={handleChartSelected} value={chartType} />
              </Row>
              <Row>
                <ChartFeedPanel />
              </Row>
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

export default TypeDrivenChart;
