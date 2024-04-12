import useQuesryString from '@/share/hook/useQueryString';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import ChapterSideMenu from './_component/ChapterSideMenu';
import TopicAnchor from './_component/TopicAnchor';
import TopicList from './_component/TopicList';

export default function LearningTopicPage() {
  const { title } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <ChapterSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>단원 - {title}</Title>
        <TopicList />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
    </Layout>
  );
}
