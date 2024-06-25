import useQuesryString from '@/share/hook/useQueryString';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import ToggleButton from '@/share/ui/button/ToggleButton';

import QuizAnchor from './_component/QuizAnchor';
import QuizSideMenu from './_component/QuizSideMenu';
import QuizTopicList from './_component/QuizTopicList';

export default function QuizCategoryTopicPage() {
  const { title } = useQuesryString();
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <QuizSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>{title}</Title>
        <ToggleButton />
        <QuizTopicList />
      </Layout.Main>
      <Layout.Right>
        <QuizAnchor />
      </Layout.Right>
    </Layout>
  );
}
