import React, { PureComponent } from 'react';
import { Table } from 'antd';

import styles from './index.less';

class DatasetTable extends PureComponent {
  render() {
    const { dataSource, columns } = this.props;
    let scroll = {};
    if (columns && columns.length > 10) {
      columns[0].fixed = 'left';
      scroll = { x: 1300 };
    }

    return (
      <div className={styles.datasetTable}>
        <Table dataSource={dataSource} columns={columns} scroll={scroll} />
      </div>
    );
  }
}

export default DatasetTable;
