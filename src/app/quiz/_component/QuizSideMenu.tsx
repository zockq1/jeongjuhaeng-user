import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Menu from '@/share/ui/menu/Menu';
import MenuSkeleton from '@/share/ui/menu/MenuSkeleton';
import { useGetQuestionCategoryListQuery } from '@/store/api/questionApi';
import { QuestionCategoryModel } from '@/types/questionTypes';

export default function QuizSideMenu() {
  const { quizId } = useParams();
  const {
    data: questionCategoryList,
    isError,
    isFetching,
    error,
  } = useGetQuestionCategoryListQuery();

  const groupedByCategory = useMemo(() => {
    return questionCategoryList?.reduce<{
      [key: string]: QuestionCategoryModel[];
    }>((acc, current) => {
      const key = current.title.split('/')[0];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(current);
      return acc;
    }, {});
  }, [questionCategoryList]);

  const currentCategory = useMemo(() => {
    return questionCategoryList
      ?.find((chapter) => chapter.id === Number(quizId))
      ?.title.split('/')[0];
  }, [questionCategoryList, quizId]);

  return (
    <Async
      data={groupedByCategory}
      isLoading={isFetching}
      isError={isError}
      loadingComponent={<MenuSkeleton count={8} />}
      errorComponent={
        <ErrorUI error={error} message="분류 목록 불러오기에 실패하였습니다." />
      }
    >
      {(groupedByCategory) => (
        <Menu>
          {Object.entries(groupedByCategory).map(([category, chapters]) => (
            <Menu.Group
              key={category}
              title={`${category} (${chapters.length})`}
              open={currentCategory === category}
              length={chapters.length}
            >
              {chapters.map((chapter) => (
                <Menu.Item
                  key={chapter.number}
                  selected={Number(quizId) === chapter.id}
                  to={`/quiz/${chapter.id}`}
                >
                  {`${chapter.title.split('/')[1]} (${chapter.topicCount})`}
                </Menu.Item>
              ))}
            </Menu.Group>
          ))}
        </Menu>
      )}
    </Async>
  );
}
