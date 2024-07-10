import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import TimelineIntroduce from './_component/TimelineIntroduce';
import TimelineSideMenu from './_component/TimelineSideMenu';

export default function TimelineListPage() {
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 연표 학습 목록"
        description="한국사 능력 검정 시험(한능검) 연표 주제 학습 목록"
      />
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <Title>연표 목록</Title>
          <TimelineSideMenu />
        </Mobile>
        <TimelineIntroduce />
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
