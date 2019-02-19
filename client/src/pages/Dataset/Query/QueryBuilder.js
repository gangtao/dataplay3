import React, { PureComponent } from 'react';
import { Row, Col , Select, Input, Button, Divider, Modal} from 'antd';
import { connect } from 'dva';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import styles from './QueryBuilder.less';

const Option = Select.Option;
const { TextArea } = Input;

@connect(({ dataset , query}) => ({
  dataset, query
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
    const queryTypes = ['query','sql'];

    const queryOptions = queryTypes.map(item => {
      return (<Option value={item}>{item}</Option>);
    });

    const handleNameChange = event => {
      currentQuery.name = event.target.value;
    }

    const handleDatasetChange = value => {
      currentQuery.dataset = value;
    }

    const handleQueryTypeChange = value => {
      currentQuery.type = value;
    }

    const handleQueryChange = event => {
      console.log("query changed!");
      currentQuery.query = event.target.value;
    }

    const handleQuery = () => {
      // TODO : validate query
      if ( !currentQuery.dataset || !currentQuery.type) {
        Modal.error({
          title: 'invalide query',
          content: 'dataset and query type must not be empty!',
        });
      } else {
        if ( !currentQuery.query ) {
          currentQuery.query = ''
        }
        onQuery();
      }
    }

    return (
      <div className={styles.queryBuilder}>
        <Row>
          Query Name:
          <Input placeholder="Query Name" onChange={handleNameChange}/>
        </Row>
        <Row>
          Select Dataset:
          <DatasetListSelector list={dataset.list} handleChange={handleDatasetChange} />
        </Row>
        <Row>
          Select Query Type:
          <Select style={{ width: '100%' }} onChange={handleQueryTypeChange}>
            {queryOptions}
          </Select>
        </Row>
        <Row>
          Input Query:
          <TextArea placeholder="Query" rows={10} onChange={handleQueryChange} />
        </Row>
        <Row>
          Query:
        </Row>
        <Row>
          <Button icon="search" onClick={handleQuery}/>
        </Row>
        <Divider/>
      </div>
    );
  }
}

export default QueryBuilder;
