import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import GrammarConfigPanel from './GrammarConfigPanel';
import VisualizationPanel from './VisualizationPanel';

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

    let savedQueryList = [];
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

    return (
      <PageHeaderWrapper>
        <div className={styles.gchart}>
          <Row gutter={16}>
            <Col span={6}>
              <Row>
                Dataset:
                <DatasetListSelector
                  datasetList={gchart.list}
                  queryList={savedQueryList}
                  handleChange={handleChange}
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
