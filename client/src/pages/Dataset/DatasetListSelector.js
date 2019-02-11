import React, { PureComponent } from 'react';
import { Select } from 'antd';

import styles from './DatasetListSelector.less';

const {Option} = Select;

class DatasetListSelector extends PureComponent {
    render() {
        const handleChange = value => {
            console.log(`selected ${value}`)
        }
        const handleBlur = value => {
            console.log('blur')
        }
        const handleFocus = value => {
            console.log('focus')
        }

        const options = [{
            "value": "jack",
            "text": "Jack"
        }, {
            "value": "lucy",
            "text": "Lucy"
        }, {
            "value": "tom",
            "text": "Tom"
        },]


        const optionContent = options.map(item  => {
            return <Option key={item.value} value={item.value}>{item.text}</Option>
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
                  {optionContent}
                </Select>
            </div>
        );
    }
}

export default DatasetListSelector;