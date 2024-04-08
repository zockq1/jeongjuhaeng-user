import useQuesryString from '@/share/hook/useQueryString';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHChapterQuiz from './_component/JJHChapterQuiz';
import JJHSideMenu from './_component/JJHSideMenu';

export default function JJHChapterQuizPage() {
  const { chapter, refresh } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <JJHChapterQuiz key={chapter + refresh} />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
    </Layout>
  );
}
