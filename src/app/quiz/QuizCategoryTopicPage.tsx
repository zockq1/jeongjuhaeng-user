import { useEffect } from 'react';

import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import ToggleButton from '@/share/ui/button/ToggleButton';
import { usePrefetch } from '@/store/api/topicApi';

import QuizAnchor from './_component/QuizAnchor';
import QuizPrevNext from './_component/QuizPrevNext';
import QuizSideMenu from './_component/QuizSideMenu';
import QuizTopicList from './_component/QuizTopicList';
import useGetQuiz from './_hook/useGetQuiz';

export default function QuizCategoryTopicPage() {
  const prefetchQuiz = usePrefetch('getQuestionCategoryTopicList');
  const { curr, prev, next } = useGetQuiz();
  const title = curr
    ? `${curr.title.split('/')[1]}(${curr.title.split('/')[0]})`
    : '';

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
        <QuizPrevNext prev={prev} next={next} />
      </Layout.Main>
      <Layout.Right>
        <QuizAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
