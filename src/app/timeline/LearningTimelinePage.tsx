import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import TimelineList from './_component/TimelineList';
import TimelineSideMenu from './_component/TimelineSideMenu';

export default function LearningTimelinePage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main>
        <TimelineList />
      </Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
