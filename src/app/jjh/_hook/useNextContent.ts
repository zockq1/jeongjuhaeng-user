import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { jjhId, chapterId, contentId } = useParams();

  const navigate = useNavigate();
  const prefetchTtoK = usePrefetch('getTtoKQuestion');
  const prefetchKtoT = usePrefetch('getKtoTQuestion');
  const { data: jjhList } = useGetJJHListQuery(isLoggedIn);
  const { data: contentList } = useGetContentListQuery(Number(jjhId));

  const nextContent = useMemo(() => {
    if (contentList && jjhList) {
      return contentList[
        contentList.findIndex(
          (content) => content.contentNumber === Number(contentId),
        ) + 1
      ];
    }
  }, [contentList, contentId, jjhList]);

  useEffect(() => {
    if (nextContent && nextContent.content === 'TOPIC_STUDY') {
      prefetchTtoK(nextContent.title);
    }

    if (nextContent && nextContent.content === 'CHAPTER_COMPLETE_QUESTION') {
      prefetchKtoT(Number(chapterId));
    }
  }, [nextContent, prefetchKtoT, prefetchTtoK, chapterId]);

  const handleNextContent = () => {
    if (!contentList || !jjhList) return;
    //다음 콘텐츠 찾기
    let nextContent: ContentModel | null;
    let nextJJHChapter: JJHChapterModel | undefined;
    let nextJJHTimeline: JJHTimelineModel | undefined;
    let isSameJJH = true;

    //다음 컨텐츠 찾기
    if (
      contentList[contentList.length - 1].contentNumber === Number(contentId)
    ) {
      //단원의 마지막
      isSameJJH = false;
      nextContent = null;
      nextJJHChapter = jjhList.chapterList.find(
        (jjh) => jjh.jjhNumber === Number(jjhId) + 1,
      );
      nextJJHTimeline = jjhList.timelineList.find(
        (jjh) => jjh.jjhNumber === Number(jjhId) + 1,
      );
    } else {
      //단원의 마지막 X
      nextContent =
        contentList[
          contentList.findIndex(
            (content) => content.contentNumber === Number(contentId),
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
          //'jeong-ju-haeng/:jjhId/chapter/:chapterId',
          `/jeong-ju-haeng/${nextJJHChapter.jjhNumber}/chapter/${nextJJHChapter.number}`,
          { replace: true },
        );
      nextJJHTimeline &&
        navigate(
          //'jeong-ju-haeng/:jjhId/timeline/:timelineId',
          `/jeong-ju-haeng/${nextJJHTimeline.jjhNumber}/timeline/${nextJJHTimeline.id}`,
          { replace: true },
        );
      return;
    }

    //다음 컨텐츠가 complete 상태가 아닌 경우
    if (nextContent.state !== 'Complete' && isSameJJH) {
      const currentContent = (nextJJHChapter = jjhList.chapterList.find(
        (jjh) => jjh.jjhNumber === Number(jjhId),
      ));
      navigate(
        //
        //'jeong-ju-haeng/:jjhId/chapter/:chapterId',
        `/jeong-ju-haeng/${currentContent?.jjhNumber}/chapter/${currentContent?.number}`,
        { replace: true },
      );
      return;
    }

    //다음 컨텐츠가 complete 상태인 경우
    if (nextContent.content === 'TOPIC_STUDY') {
      navigate(
        //'jeong-ju-haeng/:jjhId/chapter/:chapterId/:contentId/topicQuiz/:topic',
        `/jeong-ju-haeng/${jjhId}/chapter/${chapterId}/${nextContent.contentNumber}/topicQuiz/${nextContent.title}`,
        { replace: true },
      );
      return;
    }

    if (nextContent.content === 'CHAPTER_COMPLETE_QUESTION') {
      navigate(
        //'jeong-ju-haeng/:jjhId/chapter/:chapterId/:contentId/chapterQuiz',
        `/jeong-ju-haeng/${jjhId}/chapter/${chapterId}/${nextContent.contentNumber}/chapterQuiz`,
        { replace: true },
      );
      return;
    }
  };

  return { handleNextContent, nextContent };
}

export default useNextContent;
