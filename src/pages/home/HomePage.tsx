import Header from '@/component/ui/header';
import Layout from '@/share/layout/Layout';
import Popover from '@/share/popover/Popover';

export default function HomePage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>asd</Layout.Left>
      <Layout.Main>
        <Popover content={<div>내용</div>} trigger="hover" placement="bottom">
          <button>버튼</button>
        </Popover>
      </Layout.Main>
      <Layout.Right>asd</Layout.Right>
    </Layout>
  );
}
