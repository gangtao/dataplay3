import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Dataplay3',
          title: 'Dataplay3',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/gangtao',
          blankTarget: true,
        },
        {
          key: 'linkedin',
          title: <Icon type="linkedin" />,
          href: 'https://www.linkedin.com/in/taogang/',
          blankTarget: true,
        },
        {
          key: 'codepen',
          title: <Icon type="codepen" />,
          href: 'https://codepen.io/gangtao/',
          blankTarget: true,
        },
        {
          key: 'zhihu',
          title: <Icon type="zhihu" />,
          href: 'https://www.zhihu.com/people/gangtao/activities',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 gang.tao@outlook.com
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
