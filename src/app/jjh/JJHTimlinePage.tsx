import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHSideMenu from './_component/JJHSideMenu';
import JJHTimelineList from './_component/JJHTimelineList';

export default function JJHTimelinePage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <JJHTimelineList />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
    </Layout>
  );
}
