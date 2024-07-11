import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { QuestionCategoryModel } from '@/types/questionTypes';

interface QuizPrevNextProps {
  prev?: QuestionCategoryModel;
  next?: QuestionCategoryModel;
}

export default function QuizPrevNext({ prev, next }: QuizPrevNextProps) {
  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title.split('/')[1],
              category: prev.title.split('/')[0],
              to: `/quiz/${prev.id}`,
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
              to: `/quiz/${next.id}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      toMenu="/quiz"
    />
  );
}
