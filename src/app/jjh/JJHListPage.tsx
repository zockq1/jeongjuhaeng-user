import useExpendedNavigate from '@/share/hook/useExpendedNavigate';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import JJHSideMenu from './_component/JJHSideMenu';

export default function JJHListPage() {
  useExpendedNavigate(
    '/jeong-ju-haeng/chapter?jjh=1&chapter=1&title=선사시대(선사%20시대%20~%20삼국%20시대)',
  );

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
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
