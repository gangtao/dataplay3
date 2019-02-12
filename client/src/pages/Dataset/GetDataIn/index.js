import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

import DatasetUploader from './DatasetUploader'

import styles from './index.less';

class GetDataIn extends PureComponent {

    render() {
        return (
            <div className={styles.dataset}>
                <Row gutter={16}>
                    <Col span={8}>
                        <DatasetUploader ></DatasetUploader>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default GetDataIn;
