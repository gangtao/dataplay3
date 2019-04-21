import React, { PureComponent } from 'react';
import { Row, Col, Form } from 'antd';

import CustomizedForm from './CustomizedForm';

class MLJobOptionCreationPanel extends PureComponent {
  render() {
    const { datasetList, selectedDataset, onDatasetSelect, onCreate, jobType, config } = this.props;

    const CreationForm = Form.create({})(CustomizedForm);

    return (
      <Row>
        <Col span={12}>
          <CreationForm
            datasetList={datasetList}
            selectedDataset={selectedDataset}
            onDatasetSelect={onDatasetSelect}
            onCreate={onCreate}
            jobType={jobType}
            config={config}
          />
        </Col>
      </Row>
    );
  }
}

export default MLJobOptionCreationPanel;
