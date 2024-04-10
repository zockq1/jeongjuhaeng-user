import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';

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
          <ChapterSideMenu />
        </Mobile>
      </Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
