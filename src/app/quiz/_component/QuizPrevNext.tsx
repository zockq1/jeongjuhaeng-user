import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { useGetQuestionCategoryListQuery } from '@/store/api/questionApi';
import { usePrefetch } from '@/store/api/topicApi';
import { QuestionCategoryModel } from '@/types/questionTypes';

export default function QuizPrevNext() {
  const navigate = useNavigate();
  const prefetchQuiz = usePrefetch('getQuestionCategoryTopicList');
  const { chapter: currentChapter } = useQuesryString();
  const { data: questionCategoryList } = useGetQuestionCategoryListQuery();
  const { prev, next } = useMemo(() => {
    let prev: QuestionCategoryModel | undefined;
    let next: QuestionCategoryModel | undefined;
    const current = questionCategoryList?.find(
      (category) => category.id === currentChapter,
    );
    if (questionCategoryList && current) {
      questionCategoryList.forEach((category) => {
        if (category.number === current.number - 1) prev = category;
        if (category.number === current.number + 1) next = category;
      });
    }
    next && prefetchQuiz(next.id);
    return { prev, next };
  }, [questionCategoryList, currentChapter, prefetchQuiz]);

  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title.split('/')[1],
              category: prev.title.split('/')[0],
              onClick: () =>
                navigate(`/quiz/topic?chapter=${prev.id}&title=${prev.title}`),
              lock: false,
              color: 'black',
            }
          : undefined
      }
      next={
        next
          ? {
              title: next.title.split('/')[1],
              category: next.title.split('/')[0],
              onClick: () =>
                navigate(`/quiz/topic?chapter=${next.id}&title=${next.title}`),
              lock: false,
              color: 'black',
            }
          : undefined
      }
      onClickMenu={() => navigate('/quiz')}
    />
  );
}
