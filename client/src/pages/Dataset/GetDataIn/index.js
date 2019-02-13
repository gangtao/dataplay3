import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DatasetUploader from './DatasetUploader'

import styles from './index.less';

class GetDataIn extends PureComponent {

    render() {
        return (
            <PageHeaderWrapper>
                <div className={styles.getDataIn}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <DatasetUploader ></DatasetUploader>
                        </Col>
                    </Row>
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default GetDataIn;
