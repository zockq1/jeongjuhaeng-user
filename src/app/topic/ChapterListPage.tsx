import useExpendedNavigate from '@/share/hook/useExpendedNavigate';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import ChapterSideMenu from './_component/ChapterSideMenu';

export default function ChapterListPage() {
  useExpendedNavigate(
    '/learning/chapter?chapter=1&title=선사시대(선사%20시대%20~%20삼국%20시대)',
  );
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <ChapterSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <Title>단원 목록</Title>
          <ChapterSideMenu />
        </Mobile>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
