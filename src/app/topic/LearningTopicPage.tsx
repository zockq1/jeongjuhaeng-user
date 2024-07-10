import { useEffect } from 'react';

import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import PrevNextButton, { PrevNext } from '@/share/ui/button/PrevNextButton';
import ToggleButton from '@/share/ui/button/ToggleButton';
import { usePrefetch } from '@/store/api/topicApi';

import ChapterSideMenu from './_component/ChapterSideMenu';
import TopicAnchor from './_component/TopicAnchor';
import TopicList from './_component/TopicList';
import useGetChapter from './_hook/useGetChapter';

export default function LearningTopicPage() {
  const prefetchTopic = usePrefetch('getChapterTopicList');
  const { curr, next, prev } = useGetChapter();
  const title = curr ? curr.title : '';
  const toPrev: PrevNext | undefined = prev
    ? {
        title: prev.title,
        category: prev.dateComment,
        to: `/chapter/${prev.number}`,
        lock: false,
        color: 'black',
      }
    : undefined;
  const toNext: PrevNext | undefined = next
    ? {
        title: next.title,
        category: next.dateComment,
        to: `/chapter/${next.number}`,
        lock: false,
        color: 'black',
      }
    : undefined;

  useEffect(() => {
    next && prefetchTopic(next.number);
  }, [next, prefetchTopic]);

  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 단원별 학습"
        description={`한국사 능력 검정 시험(한능검)${title} 단원별 주제 학습`}
      />
      <Header />
      <Layout.Left>
        <ChapterSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>단원 - {title}</Title>
        <ToggleButton />
        <TopicList />
        <PrevNextButton prev={toPrev} next={toNext} toMenu="/chapter" />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
