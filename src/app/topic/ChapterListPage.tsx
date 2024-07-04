import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Expanded, Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';
import ContentBox from '@/share/ui/content-box/ContentBox';
import NoticeImage from '@/share/ui/notice/NoticeImage';

import ChapterSideMenu from './_component/ChapterSideMenu';

export default function ChapterListPage() {
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
        <Expanded>
          <ContentBox title="단원 학습" subTitle="선사시대 ~ 현대">
            <NoticeImage image="chapter" />
          </ContentBox>
        </Expanded>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
