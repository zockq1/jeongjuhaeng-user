import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import TimelineSideMenu from './_component/TimelineSideMenu';

export default function TimelineListPage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main></Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
