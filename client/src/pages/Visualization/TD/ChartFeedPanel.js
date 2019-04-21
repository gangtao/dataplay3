import React, { PureComponent } from 'react';
import { Select, Form } from 'antd';
import { connect } from 'dva';

import styles from './ChartFeedPanel.less';
import chartConfigs from '@/components/Visualization/ChartConfig';

const { Option } = Select;

@connect(({ tchart }) => ({
  tchart,
}))
class ChartFeedPanel extends PureComponent {
  render() {
    const { tchart, dispatch } = this.props;
    const { chartType, currentDataset, feeds } = tchart;
    const chartConfig = chartConfigs.find(chartType);
    const fields = [];
    // TODO: handle this empty field when feed to chart
    fields.push('<empty>');

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

    const updateChart = feed => {
      if (chartConfig && chartConfig.length > 0) {
        const grammar = chartConfig[0].build(feed);
        dispatch({
          type: 'tchart/updateGrammar',
          payload: grammar,
        });
      }
    };

    if (currentDataset.columns) {
      currentDataset.columns.map(col => fields.push(col.key));
    }

    const fieldsList = fields.map(value => {
      return <Option key={value}>{value}</Option>;
    });

    const buildSelect = (type, children, single) => {
      const hint = `please select ${type}`;
      const value = feeds[type];
      const handleChange = e => {
        const feed = {};
        feed[type] = e;
        dispatch({
          type: 'tchart/updateFeeds',
          payload: feed,
        });
        const newFeeds = { ...tchart.feeds, ...feed };
        updateChart(newFeeds);
      };
      return (
        <Select
          showSearch
          mode={single ? '' : 'tags'}
          placeholder={hint}
          onChange={handleChange}
          style={{ width: '100%' }}
          value={value}
        >
          {children}
        </Select>
      );
    };

    if (chartConfig && chartConfig.length > 0) {
      const feedSelectors = chartConfig[0].feeds.map(feed => {
        const single = !(feed.max > 1);
        const content = buildSelect(feed.name, fieldsList, single);
        return (
          <Form.Item key={feed.name} label={feed.name}>
            {content}
          </Form.Item>
        );
      });

      return (
        <div className={styles.chartFeed}>
          <Form {...formItemLayout}>{feedSelectors}</Form>
        </div>
      );
    }

    return <div className={styles.chartFeed} />;
  }
}

export default ChartFeedPanel;
