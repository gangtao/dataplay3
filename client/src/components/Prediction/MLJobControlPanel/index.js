import React, { PureComponent } from 'react';
import { Button, Tooltip } from 'antd';
import styles from './index.less';

class MLJobContorlPanel extends PureComponent {
  render() {
    const { canList, canCreate, onList, onCreate } = this.props;
    return (
      <div className={styles.content}>
        <Tooltip placement="top" title="view prediction jobs">
          <Button
            className={styles.contentbtn}
            icon="table"
            onClick={onList}
            disabled={!canCreate}
          />
        </Tooltip>
        <Tooltip placement="top" title="create a new prediction">
          <Button
            className={styles.contentbtn}
            icon="plus"
            onClick={onCreate}
            disabled={!canList}
          />
        </Tooltip>
      </div>
    );
  }
}

export default MLJobContorlPanel;
