import { useEffect } from 'react';

import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import PrevNextButton, { PrevNext } from '@/share/ui/button/PrevNextButton';
import ToggleButton from '@/share/ui/button/ToggleButton';
import { usePrefetch } from '@/store/api/topicApi';

import QuizAnchor from './_component/QuizAnchor';
import QuizSideMenu from './_component/QuizSideMenu';
import QuizTopicList from './_component/QuizTopicList';
import useGetQuiz from './_hook/useGetQuiz';

export default function QuizCategoryTopicPage() {
  const prefetchQuiz = usePrefetch('getQuestionCategoryTopicList');
  const { curr, prev, next } = useGetQuiz();
  const title = curr
    ? `${curr.title.split('/')[1]}(${curr.title.split('/')[0]})`
    : '';
  const toPrev: PrevNext | undefined = prev
    ? {
        title: prev.title.split('/')[1],
        category: prev.title.split('/')[0],
        to: `/quiz/${prev.id}`,
        lock: false,
        color: 'black',
      }
    : undefined;
  const toNext: PrevNext | undefined = next
    ? {
        title: next.title.split('/')[1],
        category: next.title.split('/')[0],
        to: `/quiz/${next.id}`,
        lock: false,
        color: 'black',
      }
    : undefined;

  useEffect(() => {
    next && prefetchQuiz(next.id);
  }, [next, prefetchQuiz]);

  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 연표 학습"
        description={`한국사 능력 검정 시험(한능검)${title} 연표 학습`}
      />
      <Header />
      <Layout.Left>
        <QuizSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>{title}</Title>
        <ToggleButton />
        <QuizTopicList />
        <PrevNextButton prev={toPrev} next={toNext} toMenu="/quiz" />
      </Layout.Main>
      <Layout.Right>
        <QuizAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
