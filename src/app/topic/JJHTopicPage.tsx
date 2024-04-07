import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import JJHSideMenu from './_component/JJHSideMenu';
import JJHTopicList from './_component/JJHTopicList';
import TopicAnchor from './_component/TopicAnchor';

export default function JJHTopicPage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <JJHTopicList />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
    </Layout>
  );
}
