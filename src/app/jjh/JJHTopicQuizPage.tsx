import useQuesryString from '@/share/hook/useQueryString';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHSideMenu from './_component/JJHSideMenu';
import JJHTopicQuiz from './_component/JJHTopicQuiz';

export default function JJHTopicQuizPage() {
  const { topic, refresh, title } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>정주행 문제 - {title}</Title>
        <JJHTopicQuiz key={topic + refresh} />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
