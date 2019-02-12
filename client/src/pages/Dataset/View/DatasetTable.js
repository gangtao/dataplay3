import React, { PureComponent } from 'react';
import { Table } from 'antd';

import styles from './DatasetTable.less';

class DatasetTable extends PureComponent {

    render() {
        const { dataSource, columns } = this.props
        if (columns) {
            columns[0].fixed = 'left'
        }
            
        return (
            <div className={styles.datasetTable} >
                <Table dataSource={dataSource} columns={columns} scroll={{ x: 1300 }}/>
            </div>
        );
    }
}

export default DatasetTable;