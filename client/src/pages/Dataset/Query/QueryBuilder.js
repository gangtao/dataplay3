import React, { PureComponent } from 'react';
import { Row, Col , Select, Input, Button, Divider} from 'antd';
import { connect } from 'dva';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';

import styles from './QueryBuilder.less';

const Option = Select.Option;
const { TextArea } = Input;

@connect(({ dataset}) => ({
  dataset
}))
class QueryBuilder extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dataset/fetch',
    });
  }

  render() {
    const { dataset, dispatch,  handleChange } = this.props;
    const queryTypes = ['query','sql'];

    const queryOptions = queryTypes.map(item => {
      return (<Option value={item}>{item}</Option>);
    });

    const handleDatasetChange = value => {
      console.log("dataset selected!");
    }

    return (
      <div className={styles.queryBuilder}>
        <Row>
          Query Name:
          <Input placeholder="Query Name" />
        </Row>
        <Row>
          Select Dataset:
          <DatasetListSelector list={dataset.list} handleChange={handleDatasetChange} />
        </Row>
        <Row>
          Select Query Type:
          <Select style={{ width: '100%' }}>
            {queryOptions}
          </Select>
        </Row>
        <Row>
          Input Query:
          <TextArea placeholder="Query" rows={10} />
        </Row>
        <Divider/>
        <Row>
          <Button icon="save" />
          <Button icon="export" />
          <Button icon="delete" />
        </Row>
      </div>
    );
  }
}

export default QueryBuilder;
