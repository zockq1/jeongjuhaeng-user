import useExpendedNavigate from '@/share/hook/useExpendedNavigate';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import TimelineSideMenu from './_component/TimelineSideMenu';

export default function TimelineListPage() {
  useExpendedNavigate(
    '/timeline?timeline=5&title=~%20백제%20전성기&date=0%20~%20395',
  );
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <Title>연표 목록</Title>
          <TimelineSideMenu />
        </Mobile>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
