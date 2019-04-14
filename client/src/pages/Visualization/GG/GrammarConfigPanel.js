import React, { PureComponent } from 'react';
import { Row, Select, Tabs, Form } from 'antd';
import { connect } from 'dva';

import GeomConfigPanel from './GeomConfigPanel';
import styles from './GrammarConfigPanel.less';

const { Option } = Select;
const { TabPane } = Tabs;

@connect(({ gchart }) => ({
  gchart,
}))
class GrammarConfigPanel extends PureComponent {
  constructor(props) {
    super(props);
    const { gchart } = this.props;
    const panes = [];
    this.newTabIndex = 1;
    this.buildPanel(gchart.grammar.geom, panes);

    if (panes.length > 0) {
      this.state = {
        activeKey: panes[0].key,
        panes,
      };
    } else {
      this.state = {
        activeKey: null,
        panes,
      };
    }
  }

  buildPanel = (geom, panes) => {
    Object.entries(geom).map(function(item){
      const activeKey = item[0];
      panes.push({ title: activeKey, content: '', key: activeKey });
    });
  };

  onTabChange = activeKey => {
    this.setState({ activeKey });
  };

  onTabEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `Geom${(this.newTabIndex += 1)}`;
    panes.push({ title: `Geom${this.newTabIndex}`, content: '', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    const { dispatch } = this.props;
    let { activeKey, panes } = this.state;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const updatePanels = panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    } else {
      activeKey = null;
    }

    this.setState({ updatePanels, activeKey });
    this.newTabIndex -= 1;
    dispatch({
      type: 'gchart/geomDelete',
      payload: targetKey,
    });
  };

  render() {
    const { gchart, dispatch } = this.props;
    const { currentDataset } = gchart;
    const { panes , activeKey } = this.state;
    const facatOptions = [];

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

    const handleGeomUpdate = (type, value, key) => {
      const payload = {};
      payload.key = key;
      payload.value = {};
      payload.value[type] = value;
      dispatch({
        type: 'gchart/geomUpdate',
        payload,
      });
    };

    const handlefacatUpdate = value => {
      dispatch({
        type: 'gchart/facatUpdate',
        payload: value,
      });
    };

    const handleCoordinationUpdate = value => {
      dispatch({
        type: 'gchart/coordUpdate',
        payload: value,
      });
    };

    const coordStr = ['rect', 'polar', 'theta', 'helix'];
    const coordList = coordStr.map(value => {
      return <Option key={value}>{value}</Option>;
    });

    if (currentDataset && currentDataset.columns) {
      currentDataset.columns.map(col => facatOptions.push(<Option key={col.key}>{col.key}</Option>)
      );
    }

    const facatValue = gchart.grammar.facat ? gchart.grammar.facat : [];
    const coordinationValue = gchart.grammar.coordination ? gchart.grammar.coordination : [];
    const getGeom = function(key) {
      return gchart.grammar.geom[key];
    };

    return (
      <div className={styles.grammarConfigPanel}>
        <Row gutter={16}>
          <Form {...formItemLayout}>
            <Form.Item label="facat">
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Select facat"
                onChange={handlefacatUpdate}
                value={facatValue}
              >
                {facatOptions}
              </Select>
            </Form.Item>
            <Form.Item label="Coordination">
              <Select
                style={{ width: '100%' }}
                placeholder="Select coordination"
                onChange={handleCoordinationUpdate}
                value={coordinationValue}
              >
                {coordList}
              </Select>
            </Form.Item>
          </Form>
        </Row>

        <Row gutter={16}>
          <Tabs
            onChange={this.onTabChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={this.onTabEdit}
            tabPosition="top"
            style={{ marginTop: '10px' }}
          >
            {panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                <GeomConfigPanel
                  geomKey={pane.key}
                  geomValues={getGeom(pane.key)}
                  cols={currentDataset.columns}
                  handleUpdate={handleGeomUpdate}
                />
              </TabPane>
            ))}
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default GrammarConfigPanel;
