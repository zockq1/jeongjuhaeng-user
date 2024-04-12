import useQuesryString from '@/share/hook/useQueryString';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';

import TimelineList from './_component/TimelineList';
import TimelineSideMenu from './_component/TimelineSideMenu';

export default function LearningTimelinePage() {
  const { title } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>{title}</Title>
        <TimelineList />
      </Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
