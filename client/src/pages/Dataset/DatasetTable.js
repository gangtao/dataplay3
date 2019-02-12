import React, { PureComponent } from 'react';
import { Table } from 'antd';

import styles from './DatasetTable.less';

class DatasetTable extends PureComponent {

    render() {
        const { dataSource, columns } = this.props
        console.log(`render a new data set table`)
        
        return (
            <div className={styles.datasetTable} >
                <Table dataSource={dataSource} columns={columns}/>
            </div>
        );
    }
}

export default DatasetTable;