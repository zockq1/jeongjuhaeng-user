import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { usePrefetch } from '@/store/api/jjhApi';
import { RootState } from '@/store/store';

import { usePrefetch as usePrefetchChapter } from '../../store/api/chapterApi';
import { usePrefetch as usePrefetchQuiz } from '../../store/api/questionApi';
import { usePrefetch as usePrefetchTimeline } from '../../store/api/timelineApi';

export default function usePrefetchSideMenu() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const prefetchChapter = usePrefetchChapter('getChapterList');
  const prefetchTiemline = usePrefetchTimeline('getTimelineList');
  const prefetchQuiz = usePrefetchQuiz('getQuestionCategoryList');
  const prefetchJJH = usePrefetch('getJJHList');

  useEffect(() => {
    prefetchChapter();
    prefetchTiemline();
    prefetchQuiz();
    prefetchJJH(isLoggedIn);
  }, [
    prefetchChapter,
    prefetchTiemline,
    prefetchQuiz,
    prefetchJJH,
    isLoggedIn,
  ]);
}
