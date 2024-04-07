import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import JJHSideMenu from './_component/JJHSideMenu';

export default function JJHListPage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main></Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
