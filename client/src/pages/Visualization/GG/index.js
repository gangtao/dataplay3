import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import GrammarConfigPanel from './GrammarConfigPanel';
import VisualizationPanel from './VisualizationPanel';

import styles from './index.less';

@connect(({ gg, loading }) => ({
  gg,
  loading: loading.effects['gg/fetch'],
}))
class GrammerGraph extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gg/fetch',
    });
  }

  render() {
    const { gg, loading, dispatch } = this.props;
    const { dataSource, columns } = gg.currentDataset;

    const handleChange = value => {
      console.log(`selected ${value}`);
      dispatch({
        type: 'gg/fetchSelected',
        payload: value,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.gg}>
          <Row gutter={16}>
            <Col span={6}>
              <Row>
                Dataset:
                <DatasetListSelector list={gg.list} handleChange={handleChange} />
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
