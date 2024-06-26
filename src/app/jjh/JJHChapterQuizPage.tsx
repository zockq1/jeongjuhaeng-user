import useQuesryString from '@/share/hook/useQueryString';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHChapterQuiz from './_component/JJHChapterQuiz';
import JJHSideMenu from './_component/JJHSideMenu';

export default function JJHChapterQuizPage() {
  const { chapter, refresh, title } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>단원 마무리 문제 - {title}</Title>
        <JJHChapterQuiz key={chapter + refresh} />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
