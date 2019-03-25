import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

class Categorical extends PureComponent {

  render() {
    
    return (
      <PageHeaderWrapper>
        <div className={styles.categorical}>
          Categorical
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Categorical;
