import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import ChapterSideMenu from './_component/ChapterSideMenu';
import TopicAnchor from './_component/TopicAnchor';
import TopicList from './_component/TopicList';

export default function LearningTopicPage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <ChapterSideMenu />
      </Layout.Left>
      <Layout.Main>
        <TopicList />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
    </Layout>
  );
}
