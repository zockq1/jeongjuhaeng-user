import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import JJHIntroduce from './_component/JJHIntroduce';
import JJHSideMenu from './_component/JJHSideMenu';

export default function JJHListPage() {
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 정주행 학습 목록"
        description="한국사 능력 검정 시험(한능검) 정주행 학습 목록"
      />
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <Title>정주행 목록</Title>
          <JJHSideMenu />
        </Mobile>
        <JJHIntroduce />
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
