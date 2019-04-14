import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import DatasetTable from '@/components/Dataset/DatasetTable';

@connect(({ dataset, query, loading }) => ({
  dataset,
  query,
  loading: loading.effects['dataset/fetch'],
}))
class Dataset extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataset/fetch',
    });
  }

  render() {
    const { dataset, query, dispatch } = this.props;
    const { dataSource, columns, name } = dataset.currentDataset;
    const savedQueryList = [];
    for (const p in query.savedQuery) {
      savedQueryList.push({ name: query.savedQuery[p].name });
    }

    const handleChange = (value, type) => {
      console.log(`selected ${value}`);
      if (type === 'dataset') {
        dispatch({
          type: 'dataset/fetchSelected',
          payload: value,
        });
      } else if (type === 'query') {
        const selectedQuery = query.savedQuery[value];
        dispatch({
          type: 'dataset/updateSelected',
          payload: selectedQuery,
        });
      }
    };

    return (
      <PageHeaderWrapper>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Row>
                <DatasetListSelector
                  datasetList={dataset.list}
                  queryList={savedQueryList}
                  handleChange={handleChange}
                  selected={name}
                />
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <DatasetTable dataSource={dataSource} columns={columns} />
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Dataset;
