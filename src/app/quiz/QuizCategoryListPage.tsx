import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Expanded, Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';
import ContentBox from '@/share/ui/content-box/ContentBox';
import NoticeImage from '@/share/ui/notice/NoticeImage';

import QuizSideMenu from './_component/QuizSideMenu';

export default function QuizCategoryListPage() {
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
        <Expanded>
          <ContentBox title="문제 분류별 학습" subTitle="선사시대 ~ 문화유산">
            <NoticeImage image="quiz" />
          </ContentBox>
        </Expanded>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
