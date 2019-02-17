import React, { PureComponent } from 'react';
import { Row, Col, Select, Tabs } from 'antd';
import { connect } from 'dva';

import GeomConfigPanel from './GeomConfigPanel';
import styles from './GrammarConfigPanel.less';

const Option = Select.Option;
const TabPane = Tabs.TabPane;

@connect(({ gg }) => ({
  gg,
}))
class GrammarConfigPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.newTabIndex = 1;
    const panes = [{ title: 'Geom1', content: '', key: 'Geom_0' }];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  onTabChange = activeKey => {
    this.setState({ activeKey });
  };

  onTabEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = `Geom_${this.newTabIndex++}`;
    panes.push({ title: `Geom${this.newTabIndex}`, content: '', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    const { dispatch } = this.props;
    let activeKey = this.state.activeKey;
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
    this.newTabIndex--;
    dispatch({
      type: 'gg/geomDelete',
      payload: targetKey,
    });
  };

  render() {
    const { gg, dispatch } = this.props;

    const { currentDataset } = gg;
    const facadOptions = [];

    const handleGeomUpdate = (type, value, key) => {
      let payload = {};
      payload.key = key;
      payload.value = {};
      payload.value[type] = value;
      dispatch({
        type: 'gg/geomUpdate',
        payload: payload,
      });
    };

    const handleFacadUpdate = value => {
      dispatch({
        type: 'gg/facadUpdate',
        payload: value,
      });
    };

    const handleCoordinationUpdate = value => {
      dispatch({
        type: 'gg/coordUpdate',
        payload: value,
      });
    };

    const coordStr = ['rect', 'polar', 'theta', 'helix'];
    const coordList = coordStr.map(value => {
      return <Option key={value}>{value}</Option>;
    });

    if (currentDataset && currentDataset.columns) {
      currentDataset.columns.map(col => {
        facadOptions.push(<Option key={col.key}>{col.key}</Option>);
      });
    }

    return (
      <div className={styles.grammarConfigPanel}>
        <Row gutter={16}>
          Facad:
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Please select facad"
            onChange={handleFacadUpdate}
            defaultValue={[]}
          >
            {facadOptions}
          </Select>
        </Row>

        <Row gutter={16}>
          Coordination:
          <Select
            style={{ width: '100%' }}
            placeholder="Please select coordination"
            onChange={handleCoordinationUpdate}
            defaultValue={[]}
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
            style={{ 'margin-top': '10px' }}
          >
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                <GeomConfigPanel
                  geomKey={pane.key}
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
