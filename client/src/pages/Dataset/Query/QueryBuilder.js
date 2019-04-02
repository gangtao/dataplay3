import React, { PureComponent } from 'react';
import { Row, Col, Input, Button, Tooltip, Divider, Modal, message } from 'antd';
import { connect } from 'dva';

import styles from './QueryBuilder.less';

const { TextArea } = Input;

@connect(({ query }) => ({
  query,
}))
class QueryBuilder extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataset/fetch',
    });
  }

  render() {
    const { query, dispatch, onQuery } = this.props;
    const { currentQuery, canSave } = query;

    const rawQuery = currentQuery.rawQuery ? currentQuery.rawQuery : '';

    // Question: directly update model should not be done?
    // Should dispach an action instead
    const parseQuery = queryStr => {
      const pipe = '|';
      const equal = '=';
      if (!queryStr) {
        return;
      }
      const commands = queryStr.split(pipe);

      if (commands.length === 1) {
        currentQuery.query = '';
      } else if (commands.length === 2) {
        [, currentQuery.query] = commands;
      } else {
        Modal.error({
          title: 'invalide query',
          content: 'query is not valid',
        });
        return null;
      }

      const regex = /(\w*=\w*)/g;
      const properties = commands[0].match(regex);
      currentQuery.type = 'sql';

      properties.map(property => {
        const [key, value] = property.split(equal);
        if (key === 'type') {
          currentQuery.type = value;
        } else if (key === 'dataset') {
          currentQuery.dataset = value;
        } else if (key === 'name') {
          currentQuery.name = value;
        }
      });
    };

    const handleQueryChange = event => {
      currentQuery.rawQuery = event.target.value;
    };

    const handleQuery = () => {
      parseQuery(currentQuery.rawQuery);
      if (!currentQuery.dataset || !currentQuery.type) {
        Modal.error({
          title: 'invalide query',
          content: 'dataset and query type must not be empty!',
        });
      } else {
        onQuery();
      }
    };

    const handleSave = () => {
      if (!currentQuery.name) {
        Modal.error({
          title: 'invalid query',
          content: 'the query must have a name to save',
        });
        return;
      }
      const saveResult = {};
      saveResult[currentQuery.name] = { ...query.currentQuery, ...query.currentQueryResult };
      dispatch({
        type: 'query/addQueryResult',
        payload: saveResult,
      });
      message.success(`saving query ${currentQuery.name} success`);
    };

    return (
      <div className={styles.queryBuilder}>
        <Row>
          <Col span={16}>
            <TextArea
              placeholder="Query : type=sql dataset={dataset} | querystr"
              rows={3}
              onChange={handleQueryChange}
              defaultValue={rawQuery}
            />
          </Col>
          <Col span={8}>
            <Tooltip placement="top" title="run dataset query">
              <Button icon="search" className={styles.queryAction} onClick={handleQuery} />
            </Tooltip>
            <Tooltip placement="top" title="save dataset query">
              <Button
                icon="save"
                className={styles.queryAction}
                disabled={!canSave}
                onClick={handleSave}
              />
            </Tooltip>
          </Col>
        </Row>
        <Divider />
      </div>
    );
  }
}

export default QueryBuilder;
