import React, { PureComponent } from 'react';
import { Row, Col , Steps, Icon, Button, message} from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DatasetUploader from './DatasetUploader';

import styles from './index.less';

const Step = Steps.Step;

@connect(({ dataimport }) => ({
  dataimport,
}))
class GetDataIn extends PureComponent {
  render() {
    const { dataimport, dispatch } = this.props;
    const { currentStep, dataset } = dataimport;

    const steps = [1,2,3,4];

    const next = () =>  {
      dispatch({
        type: 'dataimport/forward',
      });
    }

    const prev = () => {
      dispatch({
        type: 'dataimport/backward',
      });
    }

    return (
      <PageHeaderWrapper>
        <div className={styles.getDataIn}>
          <Row gutter={16}>
            <Col span={16}>
              <Steps current={currentStep} size="small">
                <Step title="Upload Dataset" />
                <Step title="Input Dataset Information" />
                <Step title="Review Dataset" />
                <Step title="Done" />
              </Steps>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <DatasetUploader />
            </Col>
          </Row>
          <Row gutter={16}>
            <div className="steps-action">
            {
              currentStep < steps.length - 1
              && <Button type="primary" onClick={() => next()}>Next</Button>
            }
            {
              currentStep === steps.length - 1
              && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            }
            {
              currentStep > 0
              && (
              <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                Previous
              </Button>
              )
            }
            </div>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default GetDataIn;
