import useExpendedNavigate from '@/share/hook/useExpendedNavigate';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';

import QuizSideMenu from './_component/QuizSideMenu';

export default function QuizCategoryListPage() {
  useExpendedNavigate(
    '/quiz/topic?chapter=532&title=선사시대(선사시대%20~%20남북국%20시대)',
  );
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <QuizSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Mobile>
          <Title>단원 목록</Title>
          <QuizSideMenu />
        </Mobile>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
