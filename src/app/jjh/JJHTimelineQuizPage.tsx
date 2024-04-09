import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import JJHSideMenu from './_component/JJHSideMenu';
import JJHTimelineQuiz from './_component/JJHTimelineQuiz';

export default function JJHTimelineQuizPage() {
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <JJHTimelineQuiz />
      </Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
