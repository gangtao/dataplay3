import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

class Numerical extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.numerical}>Numerical</div>
      </PageHeaderWrapper>
    );
  }
}

export default Numerical;
