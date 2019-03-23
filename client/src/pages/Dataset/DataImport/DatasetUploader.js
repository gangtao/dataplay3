import React, { PureComponent } from 'react';
import { Upload, Icon, message } from 'antd';
import { connect } from 'dva';

import styles from './DatasetUploader.less';

const { Dragger } = Upload;

@connect(({ dataimport }) => ({
  dataimport,
}))
class DatasetUploader extends PureComponent {
  render() {
    const { dataimport, dispatch } = this.props;
    const { dataset } = dataimport;

    const checkName = name => {
      return name
        .split('.')
        .slice(0, -1)
        .join('.');
    };

    const checkType = type => {
      if (type === 'text/csv') {
        return 'csv';
      } else {
        //TODO: check type as early as possible
        message.error(`file type : ${type} is not supported.`);
        return undefined;
      }
    };

    const props = {
      name: 'file',
      multiple: false,
      action: '/api/dataset_upload',
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          const dataset = {
            name: checkName(info.file.name),
            content: info.file.name,
            type: checkType(info.file.type),
            size: info.file.size,
            description: '',
          };
          dispatch({
            type: 'dataimport/updateDatasetInfo',
            payload: dataset,
          });
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div className={styles.datasetUploader}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload new dataset</p>
          <p className="ant-upload-hint">Support for a single upload.</p>
        </Dragger>
        ,
      </div>
    );
  }
}

export default DatasetUploader;
