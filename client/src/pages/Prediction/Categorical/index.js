import React, { PureComponent } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MLJobTable from '@/components/Prediction/MLJobTable';
import MLJobControlPanel from '@/components/Prediction/MLJobControlPanel';
import styles from './index.less';

@connect(({ classification, loading }) => ({
  classification,
  loading: loading.effects['classification/fetchJobs'],
}))
class Categorical extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'classification/fetchJobs',
    });
  }

  render() {
    const { classification, dispatch } = this.props;

    const { jobs } = classification;

    const onCreate = () => {};
    const onList = () => {};
    const onDelete = r => {
      console.log('delete one job');
      console.log(r);
    };
    const onView = r => {
      console.log('view one job');
      console.log(r);
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.categorical}>
          <Row>
            <MLJobControlPanel
              canList={true}
              canCreate={true}
              onList={onList}
              onCreate={onCreate}
            />
          </Row>
          <Row>
            <MLJobTable jobs={jobs} onView={onView} onDelete={onDelete} />
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Categorical;
