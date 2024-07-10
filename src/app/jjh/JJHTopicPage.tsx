import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import PrevNextButton, { PrevNext } from '@/share/ui/button/PrevNextButton';
import ToggleButton from '@/share/ui/button/ToggleButton';
import getColorAndIcon from '@/share/util/getColorAndIcon';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHSideMenu from './_component/JJHSideMenu';
import JJHTopicList from './_component/JJHTopicList';
import useGetJJHCategory from './_hook/useGetJJHCategory';
import usePrefetchJJH from './_hook/usePrefetchJJH';

export default function JJHTopicPage() {
  const { currentJJH, prevJJH, nextJJH } = useGetJJHCategory();
  usePrefetchJJH(nextJJH);
  const toPrev: PrevNext | undefined = prevJJH
    ? {
        title: prevJJH.title,
        category: prevJJH.category,
        to: prevJJH.to,
        lock: prevJJH.state === 'Locked',
        color: getColorAndIcon(prevJJH.state).color,
      }
    : undefined;
  const toNext: PrevNext | undefined = nextJJH
    ? {
        title: nextJJH.title,
        category: nextJJH.category,
        to: nextJJH.to,
        lock: nextJJH.state === 'Locked',
        color: getColorAndIcon(nextJJH.state).color,
      }
    : undefined;
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 연표 학습"
        description={`한국사 능력 검정 시험(한능검)${currentJJH?.title} 정주행 단원 학습`}
      />
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>정주행 - {currentJJH?.title}</Title>
        <ToggleButton />
        <JJHTopicList />

        <PrevNextButton prev={toPrev} next={toNext} toMenu="/jeong-ju-haeng" />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
