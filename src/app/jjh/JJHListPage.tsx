import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Expanded, Mobile } from '@/share/layout/Responsive';
import Title from '@/share/layout/Title';
import ContentBox from '@/share/ui/content-box/ContentBox';
import NoticeImage from '@/share/ui/notice/NoticeImage';

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
        <Expanded>
          <ContentBox title="정주행 학습" subTitle="선사시대 ~ 현대">
            <NoticeImage image="jjh" />
          </ContentBox>
        </Expanded>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
