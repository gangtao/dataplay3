import React, { PureComponent } from 'react';
import { Select } from 'antd';

import styles from './DatasetListSelector.less';

const {Option} = Select;

class DatasetListSelector extends PureComponent {

    render() {
        const { list, dispatch , handleChange} = this.props

        const handleBlur = value => {
            console.log('blur')
        }
        const handleFocus = value => {
            console.log('focus')
        }

        const optionContents = list.map( (item)  => {
            return <Option key={item.id} value={item.id}>{item.name}</Option>
        })

        return (
            <div className={styles.datasetListSelector} >
                <Select
                    showSearch
                    style={{
                        width: 200
                    }}
                    placeholder="Select a dataset"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                    {optionContents}
                </Select>
            </div>
        );
    }
}

export default DatasetListSelector;