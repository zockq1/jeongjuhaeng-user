import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { useGetChapterListQuery } from '@/store/api/chapterApi';
import { ChapterModel } from '@/types/chapterTypes';

export default function TopicPrevNext() {
  const navigate = useNavigate();
  const { chapter: currentChapter } = useQuesryString();
  const { data: chapterList } = useGetChapterListQuery();
  const { prev, next } = useMemo(() => {
    let prev: ChapterModel | undefined;
    let next: ChapterModel | undefined;
    if (chapterList) {
      chapterList.forEach((chapter) => {
        if (chapter.number === currentChapter - 1) prev = chapter;
        if (chapter.number === currentChapter + 1) next = chapter;
      });
    }
    return { prev, next };
  }, [chapterList, currentChapter]);

  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title,
              onClick: () =>
                navigate(
                  `/learning/chapter?chapter=${prev.number}&title=${prev.title}`,
                ),
              lock: false,
              color: 'black',
            }
          : undefined
      }
      next={
        next
          ? {
              title: next.title,
              onClick: () =>
                navigate(
                  `/learning/chapter?chapter=${next.number}&title=${next.title}`,
                ),
              lock: false,
              color: 'black',
            }
          : undefined
      }
      onClickMenu={() => navigate('/learning')}
    />
  );
}
