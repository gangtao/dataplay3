import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import GrammarConfigPanel from './GrammarConfigPanel';
import VisualizationPanel from './VisualizationPanel';

import styles from './index.less';

@connect(({ gchart, loading }) => ({
  gchart,
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
    const { gchart, loading, dispatch } = this.props;
    const { dataSource, columns } = gchart.currentDataset;

    const handleChange = value => {
      dispatch({
        type: 'gchart/fetchSelected',
        payload: value,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.gchart}>
          <Row gutter={16}>
            <Col span={6}>
              <Row>
                Dataset:
                <DatasetListSelector list={gchart.list} handleChange={handleChange} />
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
