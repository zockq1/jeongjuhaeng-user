import { useParams } from 'react-router-dom';

import MetaData from '@/share/helmet/MetaData';
import useQuesryString from '@/share/hook/useQueryString';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHChapterQuiz from './_component/JJHChapterQuiz';
import JJHSideMenu from './_component/JJHSideMenu';

export default function JJHChapterQuizPage() {
  const { refresh } = useQuesryString();
  const { chapterId } = useParams();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <MetaData
          title="정주행 한국사 | 정주행 단원 문제 풀이"
          description={`한국사 능력 검정 시험(한능검)${chapterId} 정주행 단원 문제 풀이`}
        />
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>단원 마무리 문제</Title>
        <JJHChapterQuiz key={Number(chapterId) + refresh} />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
