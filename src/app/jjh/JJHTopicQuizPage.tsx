import { useParams } from 'react-router-dom';

import MetaData from '@/share/helmet/MetaData';
import useQuesryString from '@/share/hook/useQueryString';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHSideMenu from './_component/JJHSideMenu';
import JJHTopicQuiz from './_component/JJHTopicQuiz';

export default function JJHTopicQuizPage() {
  const { refresh } = useQuesryString();
  const { topic } = useParams();
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 정주행 주제 문제 풀이"
        description={`한국사 능력 검정 시험(한능검)${topic} 정주행 주제 문제 풀이`}
      />
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>정주행 문제 - {topic}</Title>
        <JJHTopicQuiz key={String(topic) + refresh} />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
