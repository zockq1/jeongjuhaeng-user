import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import { getFormattedDateRange } from '@/share/util/getDate';
import { useGetContentListQuery, useGetJJHListQuery } from '@/store/api/jjhApi';
import { usePrefetch } from '@/store/api/questionApi';
import { RootState } from '@/store/store';
import {
  ContentModel,
  JJHChapterModel,
  JJHTimelineModel,
} from '@/types/jjhTypes';

function useNextContent() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const {
    chapter: chapterNumber,
    jjh: jjhNumber,
    content: contentNumber,
  } = useQuesryString();
  const navigate = useNavigate();
  const prefetchTtoK = usePrefetch('getTtoKQuestion');
  const prefetchKtoT = usePrefetch('getKtoTQuestion');
  const { data: jjhList } = useGetJJHListQuery(isLoggedIn);
  const { data: contentList } = useGetContentListQuery(jjhNumber);

  const nextContent = useMemo(() => {
    if (contentList && jjhList) {
      return contentList[
        contentList.findIndex(
          (content) => content.contentNumber === contentNumber,
        ) + 1
      ];
    }
  }, [contentList, contentNumber, jjhList]);

  useEffect(() => {
    if (nextContent && nextContent.content === 'TOPIC_STUDY') {
      prefetchTtoK(nextContent.title);
    }

    if (nextContent && nextContent.content === 'CHAPTER_COMPLETE_QUESTION') {
      prefetchKtoT(chapterNumber);
    }
  }, [nextContent, prefetchKtoT, prefetchTtoK, chapterNumber]);

  const handleNextContent = () => {
    if (!contentList || !jjhList) return;
    //다음 콘텐츠 찾기
    let nextContent: ContentModel | null;
    let nextJJHChapter: JJHChapterModel | undefined;
    let nextJJHTimeline: JJHTimelineModel | undefined;
    let isSameJJH = true;

    //다음 컨텐츠 찾기
    if (contentList[contentList.length - 1].contentNumber === contentNumber) {
      //단원의 마지막
      isSameJJH = false;
      nextContent = null;
      nextJJHChapter = jjhList.chapterList.find(
        (jjh) => jjh.jjhNumber === jjhNumber + 1,
      );
      nextJJHTimeline = jjhList.timelineList.find(
        (jjh) => jjh.jjhNumber === jjhNumber + 1,
      );
    } else {
      //단원의 마지막 X
      nextContent =
        contentList[
          contentList.findIndex(
            (content) => content.contentNumber === contentNumber,
          ) + 1
        ];
    }

    if (!nextContent && !nextJJHChapter && !nextJJHTimeline) {
      navigate('/jeong-ju-haeng');
      return;
    }

    if (!nextContent) {
      //다음 컨텐츠가 다음 단원일 경우
      nextJJHChapter &&
        navigate(
          `/jeong-ju-haeng/chapter?jjh=${nextJJHChapter.jjhNumber}&chapter=${nextJJHChapter.number}&title=${nextJJHChapter.title}(${nextJJHChapter.dateComment})`,
          { replace: true },
        );
      nextJJHTimeline &&
        navigate(
          `/jeong-ju-haeng/timeline?jjh=${nextJJHTimeline.jjhNumber}&timeline=${
            nextJJHTimeline.id
          }&title=${nextJJHTimeline.era}
            &date=${getFormattedDateRange(
              nextJJHTimeline.startDate / 10000,
              nextJJHTimeline.endDate / 10000,
            )}`,
          { replace: true },
        );
      return;
    }

    //다음 컨텐츠가 complete 상태가 아닌 경우
    if (nextContent.state !== 'Complete' && isSameJJH) {
      const currentContent = (nextJJHChapter = jjhList.chapterList.find(
        (jjh) => jjh.jjhNumber === jjhNumber,
      ));
      navigate(
        `/jeong-ju-haeng/chapter?jjh=${currentContent?.jjhNumber}&chapter=${currentContent?.number}&title=${currentContent?.title}(${currentContent?.dateComment})`,
        { replace: true },
      );
      return;
    }

    //다음 컨텐츠가 complete 상태인 경우
    if (nextContent.content === 'TOPIC_STUDY') {
      navigate(
        `/jeong-ju-haeng/topic/quiz?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${nextContent.title}&content=${nextContent.contentNumber}&title=${nextContent.title}(${nextContent.dateComment})`,
        { replace: true },
      );
      return;
    }

    if (nextContent.content === 'CHAPTER_COMPLETE_QUESTION') {
      navigate(
        `/jeong-ju-haeng/chapter/quiz?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${nextContent.contentNumber}`,
        { replace: true },
      );
      return;
    }
  };

  return { handleNextContent, nextContent };
}

export default useNextContent;
