import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';

import TimelineSideMenu from './_component/TimelineSideMenu';

export default function TimelineListPage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <TimelineSideMenu />
        </Mobile>
      </Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
