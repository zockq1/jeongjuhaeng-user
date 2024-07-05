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
