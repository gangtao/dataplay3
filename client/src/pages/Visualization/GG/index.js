import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

class GetDataIn extends PureComponent {

    render() {
        return (
            <PageHeaderWrapper>
                <div className={styles.gg}>
                    <Row gutter={16}>
                        <Col span={8}>
                            Visualization
                        </Col>
                    </Row>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default GetDataIn;
