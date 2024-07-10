import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetQuestionCategoryListQuery } from '@/store/api/questionApi';
import { QuestionCategoryModel } from '@/types/questionTypes';

export default function useGetQuiz() {
  const { quizId } = useParams();
  const { data: questionCategoryList } = useGetQuestionCategoryListQuery();
  const { prev, next, curr } = useMemo(() => {
    let prev: QuestionCategoryModel | undefined;
    let next: QuestionCategoryModel | undefined;
    let curr: QuestionCategoryModel | undefined;
    const current = questionCategoryList?.find(
      (category) => category.id === Number(quizId),
    );
    if (questionCategoryList && current) {
      questionCategoryList.forEach((category) => {
        if (category.number === current.number - 1) prev = category;
        if (category.number === current.number) curr = category;
        if (category.number === current.number + 1) next = category;
      });
    }
    return { prev, next, curr };
  }, [questionCategoryList, quizId]);

  return { prev, next, curr };
}
