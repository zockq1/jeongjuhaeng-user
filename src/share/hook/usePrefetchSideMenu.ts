import { useEffect } from 'react';

import { usePrefetch as usePrefetchChapter } from '../../store/api/chapterApi';
import { usePrefetch as usePrefetchQuiz } from '../../store/api/questionApi';
import { usePrefetch as usePrefetchTimeline } from '../../store/api/timelineApi';

export default function usePrefetchSideMenu() {
  const prefetchChapter = usePrefetchChapter('getChapterList');
  const prefetchTiemline = usePrefetchTimeline('getTimelineList');
  const prefetchQuiz = usePrefetchQuiz('getQuestionCategoryList');

  useEffect(() => {
    prefetchChapter();
    prefetchTiemline();
    prefetchQuiz();
  }, [prefetchChapter, prefetchTiemline, prefetchQuiz]);
}
