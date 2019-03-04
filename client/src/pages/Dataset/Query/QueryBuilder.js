import React, { PureComponent } from 'react';
import { Row, Col, Select, Input, Button, Divider, Modal } from 'antd';
import { connect } from 'dva';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import styles from './QueryBuilder.less';

const Option = Select.Option;
const { TextArea } = Input;

@connect(({ dataset, query }) => ({
  dataset,
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
    const { dataset, query, dispatch, onQuery } = this.props;
    const { currentQuery } = query;
    const queryTypes = ['query', 'sql'];

    const handleQueryChange = event => {
      currentQuery.query = event.target.value
    };

    const queryParser = query => {
      const pipe = '|';
      const equal = '=';
      if (!query) {
        return;
      }
      const commands = query.split(pipe)
      console.log(commands);

      if ( commands.length == 1 ) {
        currentQuery.query = '';
      } else if ( commands.length == 2 ) {
        currentQuery.query = commands[1];
      } else {
        Modal.error({
          title: 'invalide query',
          content: 'query is not valid',
        });
        return;
      }

      const regex = /(\w*=\w*)/g;
      const properties = commands[0].match(regex)

      properties.map( property => {
        console.log(property);
        const [key, value] = property.split(equal);
        if ( key === 'type') {
          currentQuery.type = value;
        } else if ( key === 'dataset') {
          currentQuery.dataset = value;
        } 
      })
    }

    const handleQuery = () => {
      // TODO : validate query
      queryParser(currentQuery.query)
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

    return (
      <div className={styles.queryBuilder}>
        <Row>
          <Col span={16}>
            <TextArea placeholder="Query : type=sql dataset={dataset} | querystr" rows={3} onChange={handleQueryChange} />
          </Col>
          <Col span={8}>
            <Button icon="search" onClick={handleQuery} />
          </Col>
        </Row>
        <Divider />
      </div>
    );
  }
}

export default QueryBuilder;
