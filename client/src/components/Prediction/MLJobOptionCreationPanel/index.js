import React, { PureComponent } from 'react';
import { Select, Button, Tooltip } from 'antd';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import styles from './index.less';

const Option = Select.Option;

class MLJobOptionCreationPanel extends PureComponent {
  render() {
    const { datasetList, selectedDataset, handleDatasetSelection } = this.props;

    let name = undefined;
    if (selectedDataset.name) {
      name = selectedDataset.name;
    }

    let fieldsOptions = [];
    if (selectedDataset.cols) {
      fieldsOptions = selectedDataset.cols.map(item => {
        return <Option key={item}>{item}</Option>;
      });
    }

    const handleFeatureChange = () => {};

    const handleTargetChange = () => {};

    return (
      <div className={styles.content}>
        <DatasetListSelector
          datasetList={datasetList}
          queryList={[]}
          handleChange={handleDatasetSelection}
          selected={name}
        />

        <Select
          size="default"
          mode="multiple"
          onChange={handleFeatureChange}
          style={{ width: 200 }}
        >
          {fieldsOptions}
        </Select>

        <Select size="default" onChange={handleTargetChange} style={{ width: 200 }}>
          {fieldsOptions}
        </Select>
      </div>
    );
  }
}

export default MLJobOptionCreationPanel;
