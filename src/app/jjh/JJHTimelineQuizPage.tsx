import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import JJHSideMenu from './_component/JJHSideMenu';
import JJHTimelineQuiz from './_component/JJHTimelineQuiz';
import useGetJJHCategory from './_hook/useGetJJHCategory';

export default function JJHTimelineQuizPage() {
  const { currentJJH } = useGetJJHCategory();
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 연표 문제"
        description={`한국사 능력 검정 시험(한능검)${currentJJH?.title} 정주행 연표 문제`}
      />
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>정주행 연표 문제 - {currentJJH?.title}</Title>
        <JJHTimelineQuiz />
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
