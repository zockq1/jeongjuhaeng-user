import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PrevNextButton from '@/share/ui/button/PrevNextButton';
import getColorAndIcon from '@/share/util/getColorAndIcon';
import { usePrefetch as usePrefetchJJH } from '@/store/api/jjhApi';
import { usePrefetch as usePrefetchTopic } from '@/store/api/topicApi';

import useGetJJHCategory from '../_hook/useGetJJHCategory';

export default function JJHPrevNext() {
  const prefetchJJH = usePrefetchJJH('getContentList');
  const prefetchTopic = usePrefetchTopic('getChapterTopicList');
  const { nextJJH, prevJJH } = useGetJJHCategory();
  const navigate = useNavigate();

  useEffect(() => {
    nextJJH?.state !== 'Locked' && nextJJH && prefetchJJH(nextJJH.jjhNumber);
    nextJJH?.state !== 'Locked' && nextJJH && prefetchTopic(nextJJH.number);
  }, [nextJJH, prefetchJJH, prefetchTopic]);

  return (
    <PrevNextButton
      prev={
        prevJJH
          ? {
              title: prevJJH.title,
              category: prevJJH.category,
              onClick: prevJJH.onClick,
              lock: prevJJH.state === 'Locked',
              color: getColorAndIcon(prevJJH.state).color,
            }
          : undefined
      }
      next={
        nextJJH
          ? {
              title: nextJJH.title,
              category: nextJJH.category,
              onClick: nextJJH.onClick,
              lock: nextJJH.state === 'Locked',
              color: getColorAndIcon(nextJJH.state).color,
            }
          : undefined
      }
      onClickMenu={() => navigate('/jeong-ju-haeng')}
    />
  );
}
