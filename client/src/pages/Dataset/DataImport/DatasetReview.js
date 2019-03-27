import React, { PureComponent } from 'react';
import { Row, Col, Button, message } from 'antd';
import { connect } from 'dva';

import { createDataset } from '@/services/dataset';

@connect(({ dataimport }) => ({
  dataimport,
}))
class DatasetReview extends PureComponent {
  render() {
    const { dataimport, dispatch } = this.props;
    const { dataset } = dataimport;
    const datasetInfo = JSON.stringify(dataset);

    const payload = { ...dataset };
    payload.id = payload.name;

    let info = [];
    for (const p in dataset) {
      info.push(
        <li>
          {p} : {dataset[p]}
        </li>
      );
    }

    const handleCreate = () => {
      const response = createDataset(payload);
      response.then(
        function(value) {
          message.success(`dataset ${dataset.name} has been created!`);
        },
        function(error) {
          message.error(`failed to create ${dataset.name}`);
        }
      );
    };
    return (
      <div>
        <Row gutter={16}>
          <p>following dataset will be added</p>
          {info}
          <p>
            click <Button size="small" type="primary" icon="save" onClick={handleCreate} /> button
            to create the dataset
          </p>
        </Row>
      </div>
    );
  }
}

export default DatasetReview;
