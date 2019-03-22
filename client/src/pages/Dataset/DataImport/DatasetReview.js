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

    const info = `following dataset will be added, ${datasetInfo} , click create button to create the dataset.`

    const handleCreate = () => {
        const response = createDataset(payload);
        response.then(function(value) {
            message.success(`dataset ${dataset.name} has been created!`);
        }, function(error) {
            message.error(`failed to create ${dataset.name}`);
        });
    }
    return (
        <div>
            {info}
            <Button onClick={handleCreate}>Create</Button>
        </div>);
  }
}

export default DatasetReview;
