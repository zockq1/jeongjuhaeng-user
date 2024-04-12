import useQuesryString from '@/share/hook/useQueryString';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import JJHSideMenu from './_component/JJHSideMenu';
import JJHTimelineQuiz from './_component/JJHTimelineQuiz';

export default function JJHTimelineQuizPage() {
  const { title } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>정주행 연표 문제 - {title}</Title>
        <JJHTimelineQuiz />
      </Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
