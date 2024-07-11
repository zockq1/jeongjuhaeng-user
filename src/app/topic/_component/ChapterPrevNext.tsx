import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { ChapterModel } from '@/types/chapterTypes';
interface ChapterPrevNextProps {
  prev?: ChapterModel;
  next?: ChapterModel;
}

export default function ChapterPrevNext({ prev, next }: ChapterPrevNextProps) {
  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title,
              category: prev.dateComment,
              to: `/chapter/${prev.number}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      next={
        next
          ? {
              title: next.title,
              category: next.dateComment,
              to: `/chapter/${next.number}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      toMenu="/chapter"
    />
  );
}
