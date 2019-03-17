import React, { PureComponent } from 'react';
import { Row, Select, Tabs } from 'antd';
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
    Object.entries(geom).map(item => {
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
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    } else {
      activeKey = null;
    }

    this.setState({ panes, activeKey });
    this.newTabIndex -= 1;
    dispatch({
      type: 'gchart/geomDelete',
      payload: targetKey,
    });
  };

  render() {
    const { gchart, dispatch } = this.props;
    const { currentDataset } = gchart;
    const facatOptions = [];

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
      currentDataset.columns.map(col => {
        facatOptions.push(<Option key={col.key}>{col.key}</Option>);
      });
    }

    const facatValue = gchart.grammar.facat ? gchart.grammar.facat : [];
    const coordinationValue = gchart.grammar.coordination ? gchart.grammar.coordination : [];
    const getGeom = function(key) {
      return gchart.grammar.geom[key];
    };

    return (
      <div className={styles.grammarConfigPanel}>
        <Row gutter={16}>
          facat:
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select facat"
            onChange={handlefacatUpdate}
            value={facatValue}
          >
            {facatOptions}
          </Select>
        </Row>

        <Row gutter={16}>
          Coordination:
          <Select
            style={{ width: '100%' }}
            placeholder="Select coordination"
            onChange={handleCoordinationUpdate}
            value={coordinationValue}
          >
            {coordList}
          </Select>
        </Row>
        <Row gutter={16}>
          <Tabs
            onChange={this.onTabChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onTabEdit}
            tabPosition="top"
            style={{ marginTop: '10px' }}
          >
            {this.state.panes.map(pane => (
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
