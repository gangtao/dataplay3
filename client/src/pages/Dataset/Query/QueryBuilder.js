import React, { PureComponent } from 'react';
import { Row, Col, Input, Button, Divider, Modal } from 'antd';
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
    const { query, onQuery } = this.props;
    const { currentQuery } = query;

    const handleQueryChange = event => {
      currentQuery.query = event.target.value;
    };

    const queryParser = queryStr => {
      const pipe = '|';
      const equal = '=';
      if (!queryStr) {
        return;
      }
      const commands = queryStr.split(pipe);

      if (commands.length === 1) {
        currentQuery.query = '';
      } else if (commands.length === 2) {
        [currentQuery.query] = commands;
      } else {
        Modal.error({
          title: 'invalide query',
          content: 'query is not valid',
        });
        return;
      }

      const regex = /(\w*=\w*)/g;
      const properties = commands[0].match(regex);

      properties.map(property => {
        const [key, value] = property.split(equal);
        if (key === 'type') {
          currentQuery.type = value;
        } else if (key === 'dataset') {
          currentQuery.dataset = value;
        }
      });
    };

    const handleQuery = () => {
      // TODO : validate query
      queryParser(currentQuery.query);
      if (!currentQuery.dataset || !currentQuery.type) {
        Modal.error({
          title: 'invalide query',
          content: 'dataset and query type must not be empty!',
        });
      } else {
        if (!currentQuery.query) {
          currentQuery.query = '';
        }
        onQuery();
      }
    };

    const handleSave = () => {
      console.log('query save');
    };

    const handleExport = () => {
      console.log('query export');
    };

    return (
      <div className={styles.queryBuilder}>
        <Row>
          <Col span={16}>
            <TextArea
              placeholder="Query : type=sql dataset={dataset} | querystr"
              rows={3}
              onChange={handleQueryChange}
            />
          </Col>
          <Col span={8}>
            <Button icon="search" onClick={handleQuery} />
            <Button icon="save" onClick={handleSave} />
            <Button icon="export" onClick={handleExport} />
          </Col>
        </Row>
        <Divider />
      </div>
    );
  }
}

export default QueryBuilder;
