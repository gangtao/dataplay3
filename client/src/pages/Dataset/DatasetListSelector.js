import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

import styles from './DatasetListSelector.less';

const {Option} = Select;

@connect(({ dataset, loading }) => ({
    dataset,
    loading: loading.effects['dataset/fetch'],
}))
class DatasetListSelector extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'dataset/fetch',
        });
    }

    render() {
        const { dataset, dispatch } = this.props

        const handleChange = value => {
            console.log(`selected ${value}`)
            dispatch({
                type: 'dataset/fetchSelected',
                payload: value
            });
        }

        const handleBlur = value => {
            console.log('blur')
        }
        const handleFocus = value => {
            console.log('focus')
        }

        const optionContents = dataset.list.map( (item)  => {
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