import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

class TimeSerial extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.timeserial}>TimeSerial</div>
      </PageHeaderWrapper>
    );
  }
}

export default TimeSerial;
