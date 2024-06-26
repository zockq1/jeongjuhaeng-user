import useQuesryString from '@/share/hook/useQueryString';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import ToggleButton from '@/share/ui/button/ToggleButton';

import TimelineList from './_component/TimelineList';
import TimelinePrevNext from './_component/TimelinePrevNext';
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
        <Title>연표 - {title}</Title>
        <ToggleButton />
        <TimelineList />
        <TimelinePrevNext />
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
