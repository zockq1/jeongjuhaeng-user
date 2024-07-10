import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import ChapterIntroduce from './_component/ChapterIntroduce';
import ChapterSideMenu from './_component/ChapterSideMenu';

export default function ChapterListPage() {
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 단원별 학습 목록"
        description="한국사 능력 검정 시험(한능검) 단원별 주제 학습 목록"
      />
      <Header />
      <Layout.Left>
        <ChapterSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <Title>단원 목록</Title>
          <ChapterSideMenu />
        </Mobile>
        <ChapterIntroduce />
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
