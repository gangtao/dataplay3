import React, { PureComponent } from 'react';
import { Select , Icon} from 'antd';

import styles from './index.less';

const { Option } = Select;

class DatasetListSelector extends PureComponent {
  render() {
    const { datasetList, queryList, handleChange, size } = this.props;

    let optionContents = datasetList.map(item => {
      return (
        <Option key={item.id} value={item.id} type="dataset" >
          <span className={styles.datasetType}>{item.name} <Icon type="table" /> </span>
        </Option>
      );
    });

    queryList.map(item => {
      optionContents.push (
        <Option key={item.name} value={item.name} type="query" >
          <span className={styles.datasetType}>{item.name} <Icon type="search" /> </span>
        </Option>
      );
    });

    const handleFilter = (input, option) => {
      return option.props.children.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
    };

    const handleSelectionChange = (value, option) => {
      console.log(value);
      console.log(option);
      handleChange(value, option.props.type);
    }

    return (
      <div className={styles.datasetListSelector}>
        <Select
          size={size}
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a dataset"
          optionFilterProp="children"
          onChange={handleSelectionChange}
          filterOption={handleFilter}
        >
          {optionContents}
        </Select>
      </div>
    );
  }
}

export default DatasetListSelector;
