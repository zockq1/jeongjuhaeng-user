import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import QuizIntroduce from './_component/QuizIntroduce';
import QuizSideMenu from './_component/QuizSideMenu';

export default function QuizCategoryListPage() {
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 문제 분류별 학습 목록"
        description="한국사 능력 검정 시험(한능검) 문제 분류별 학습 목록"
      />
      <Header />
      <Layout.Left>
        <QuizSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <Title>단원 목록</Title>
          <QuizSideMenu />
        </Mobile>
        <QuizIntroduce />
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
