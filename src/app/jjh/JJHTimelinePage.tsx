import useQuesryString from '@/share/hook/useQueryString';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import ToggleButton from '@/share/ui/button/ToggleButton';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHPrevNext from './_component/JJHPrevNext';
import JJHSideMenu from './_component/JJHSideMenu';
import JJHTimelineList from './_component/JJHTimelineList';

export default function JJHTimelinePage() {
  const { title } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>정주행 - {title}</Title>
        <ToggleButton />
        <JJHTimelineList />
        <JJHPrevNext />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
    </Layout>
  );
}
