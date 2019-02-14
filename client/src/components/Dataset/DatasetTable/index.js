import React, { PureComponent } from 'react';
import { Table } from 'antd';

import styles from './index.less';

class DatasetTable extends PureComponent {
  render() {
    const { dataSource, columns } = this.props;
    const whenTofix = 10
    const fixX = 1300
    let scroll = {};
    if (columns && columns.length > whenTofix ) {
      columns[0].fixed = 'left';
      scroll = { x: fixX };
    }

    return (
      <div className={styles.datasetTable}>
        <Table dataSource={dataSource} columns={columns} scroll={scroll} />
      </div>
    );
  }
}

export default DatasetTable;
