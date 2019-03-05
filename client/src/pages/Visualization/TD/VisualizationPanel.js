import { connect } from 'dva';
import gchartChart from '@/components/Visualization/GGChart';

export default connect(({ tchart }) => ({
  model: tchart,
}))(gchartChart);
