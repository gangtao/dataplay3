import React, { PureComponent } from 'react';
import { Row, Col, Tabs, Button, Tooltip, Modal } from 'antd';
import { connect } from 'dva';

import { saveConfig } from '@/services/config';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ConfigTab from './ConfigTab';

import styles from './index.less';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

@connect(({ config }) => ({
  config,
}))
class Configuration extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'config/fetchAll',
    });
  }

  render() {
    const { config, dispatch } = this.props;

    const buildTabContent = (data, domain) => {
      const callback = row => {
        if (config[domain][row.section][row.key] === row.value) {
          return;
        }
        confirm({
          title: 'Do you want to update configuration?',
          content: `When clicked the OK button, ${domain}.${row.section}.${
            row.key
          } will updated from ${config[domain][row.section][row.key]} to ${row.value}`,
          onOk() {
            const payload = {};
            payload.domain = domain;
            payload.value = config[domain];
            payload.value[row.section][row.key] = row.value;
            dispatch({
              type: 'config/updateOne',
              payload: payload,
            });
          },
          onCancel() {},
        });
      };
      return <ConfigTab data={data} handleChange={callback} />;
    };

    const buildTabPanel = () => {
      const tabs = [];
      for (const domain in config) {
        const content = buildTabContent(config[domain], domain);
        tabs.push(
          <TabPane tab={domain} key={domain}>
            {content}
          </TabPane>
        );
      }
      return tabs;
    };

    const handleSave = () => {};

    return (
      <PageHeaderWrapper>
        <div className={styles.config}>
          <Row gutter={16} type="flex" justify="end">
            <Col span={6}>
              <div className={styles.configHeader}>
                <Tooltip placement="top" title="save configuration">
                  <Button icon="save" onClick={handleSave} />
                </Tooltip>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Tabs>{buildTabPanel()}</Tabs>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Configuration;
