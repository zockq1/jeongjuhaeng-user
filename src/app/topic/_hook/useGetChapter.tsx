import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetChapterListQuery } from '@/store/api/chapterApi';
import { ChapterModel } from '@/types/chapterTypes';

export default function useGetChapter() {
  const { chapterId } = useParams();
  const { data: chapterList, isSuccess } = useGetChapterListQuery();

  const { prev, curr, next } = useMemo(() => {
    let prev: ChapterModel | undefined;
    let next: ChapterModel | undefined;
    let curr: ChapterModel | undefined;
    if (isSuccess) {
      chapterList.forEach((chapter) => {
        if (chapter.number === Number(chapterId) - 1) prev = chapter;
        if (chapter.number === Number(chapterId)) curr = chapter;
        if (chapter.number === Number(chapterId) + 1) next = chapter;
      });
    }
    return { prev, curr, next };
  }, [chapterList, chapterId, isSuccess]);

  return { prev, curr, next };
}
