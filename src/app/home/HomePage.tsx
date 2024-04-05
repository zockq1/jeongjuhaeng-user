import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Popover from '@/share/ui/popover/Popover';

import PolicyAgreePage from '../auth/_component/PolicyAgree';

export default function HomePage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>asd</Layout.Left>
      <Layout.Main>
        <ContentBox title="고조선" subTitle="BC 2333 ~ BC 108"></ContentBox>
      </Layout.Main>
      <Layout.Right>asd</Layout.Right>
    </Layout>
  );
}
