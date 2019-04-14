import React, { PureComponent } from 'react';
import { Row, Col, Form, Button, Tooltip, Modal, Input, message } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import GrammarConfigPanel from './GrammarConfigPanel';
import VisualizationPanel from './VisualizationPanel';

import { createDashboard } from '@/services/dashboard';

import styles from './index.less';

@connect(({ gchart, query, loading }) => ({
  gchart,
  query,
  loading: loading.effects['gchart/fetch'],
}))
class GrammerGraph extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gchart/fetch',
    });
  }

  render() {
    const { gchart, query, dispatch } = this.props;
    const { name } = gchart.currentDataset;
    const { visible, title, description } = gchart.export;

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const savedQueryList = [];
    Object.keys(query.savedQuery).map(key =>
      savedQueryList.push({ name: query.savedQuery[key].name })
    );

    const handleChange = (value, type) => {
      if (type === 'dataset') {
        dispatch({
          type: 'gchart/fetchSelected',
          payload: value,
        });
      } else if (type === 'query') {
        const selectedQuery = query.savedQuery[value];
        dispatch({
          type: 'gchart/updateSelected',
          payload: selectedQuery,
        });
      }
    };

    const toggleExport = show => {
      const payload = {
        visible: show,
      };
      dispatch({
        type: 'gchart/exportUpdate',
        payload,
      });
    };

    const exportToDashboard = () => {
      toggleExport(true);
    };

    const handleExportConfirm = () => {
      const restParams = {};
      restParams.title = title;
      restParams.description = description;
      if (gchart.currentDataset.type) {
        restParams.dataset = gchart.currentDataset.dataset;
        restParams.query = gchart.currentDataset.query;
        restParams.queryType = gchart.currentDataset.type;
      } else {
        restParams.dataset = gchart.currentDataset.name;
        restParams.query = '';
        restParams.queryType = undefined;
      }
      // TODO: handle scale for some chart type such as heatmap
      restParams.grammar = gchart.grammar;
      const payload = { restParams };
      createDashboard(payload);
      toggleExport(false);
      // TODO: handle rest failure;
      message.info('current visualization has been exported to dashboard!');
    };

    const handleExportCancel = () => {
      toggleExport(false);
    };

    const handleTitleChange = e => {
      const payload = {
        title: e.target.value,
      };
      dispatch({
        type: 'gchart/exportUpdate',
        payload,
      });
    };

    const handleDescriptionChange = e => {
      const payload = {
        description: e.target.value,
      };
      dispatch({
        type: 'gchart/exportUpdate',
        payload,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.gchart}>
          <Row gutter={16} type="flex" justify="end">
            <Col span={6}>
              <div className={styles.ggHeader}>
                <Tooltip placement="top" title="export to dashboard">
                  <Button icon="export" onClick={exportToDashboard} />
                </Tooltip>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Row>
                <Form {...formItemLayout}>
                  <Form.Item label="Dataset">
                    <DatasetListSelector
                      datasetList={gchart.list}
                      queryList={savedQueryList}
                      handleChange={handleChange}
                      selected={name}
                    />
                  </Form.Item>
                </Form>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <GrammarConfigPanel />
            </Col>
            <Col span={16}>
              <VisualizationPanel />
            </Col>
          </Row>
        </div>
        <Modal
          title="Export Visualization to Dashboard"
          visible={visible}
          onOk={handleExportConfirm}
          onCancel={handleExportCancel}
        >
          <Input.Group>
            <Input placeholder="Title" defaultValue={title} onChange={handleTitleChange} />
            <Input
              placeholder="Description"
              defaultValue={description}
              onChange={handleDescriptionChange}
            />
          </Input.Group>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default GrammerGraph;
