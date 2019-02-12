import React, { PureComponent } from 'react';
import { Upload, Icon, message } from 'antd';

import styles from './DatasetUploader.less';

const Dragger = Upload.Dragger;

class DatasetUploader extends PureComponent {

    render() {
        const props = {
            name: 'file',
            multiple: false,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div className={styles.datasetUploader} >
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload new dataset</p>
                    <p className="ant-upload-hint">Support for a single upload.</p>
                </Dragger>,
            </div>
        );
    }
}

export default DatasetUploader;