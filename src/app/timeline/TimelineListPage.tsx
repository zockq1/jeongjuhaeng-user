import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Expanded, Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';
import ContentBox from '@/share/ui/content-box/ContentBox';
import NoticeImage from '@/share/ui/notice/NoticeImage';

import TimelineSideMenu from './_component/TimelineSideMenu';

export default function TimelineListPage() {
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
        <Expanded>
          <ContentBox title="연표 학습" subTitle="BC700000 ~ 2024">
            <NoticeImage image="timeline" />
          </ContentBox>
        </Expanded>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
