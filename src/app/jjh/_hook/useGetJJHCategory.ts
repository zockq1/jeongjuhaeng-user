import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import getDate from '@/share/util/getDate';
import { useGetJJHListQuery } from '@/store/api/jjhApi';
import { RootState } from '@/store/store';
import { ContentState, JJHTimelineModel } from '@/types/jjhTypes';

interface JJHModel {
  number: number;
  jjhNumber: number;
  title: string;
  state: ContentState;
  category: string;
  type: 'topic' | 'timeline';
  onClick: () => void;
}

interface FinalGroup {
  [key: string]: {
    items: JJHModel[];
    state: ContentState;
  };
}

export default function useGetJJHCategory() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { jjh: currentJJH } = useQuesryString();
  const navigate = useNavigate();
  const {
    data: jjhList,
    isLoading,
    isError,
    error,
  } = useGetJJHListQuery(isLoggedIn);
  const [currentGroup, setCurrentGroup] = useState('');

  const groupedByDateComment = useMemo(() => {
    if (!jjhList) return;

    const initialGroup = [...jjhList.chapterList]
      .sort((a, b) => a.number - b.number)
      .reduce<{
        [key: string]: JJHModel[];
      }>((acc, current) => {
        const { dateComment, title, number, state, jjhNumber } = current;
        if (jjhNumber === currentJJH) setCurrentGroup(dateComment);
        const key = dateComment;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push({
          category: dateComment,
          number: number,
          jjhNumber: jjhNumber,
          title: title,
          state: state,
          type: 'topic',
          onClick: () =>
            navigate(
              `/jeong-ju-haeng/chapter?jjh=${jjhNumber}&chapter=${number}&title=${title}(${dateComment})`,
            ),
        });
        return acc;
      }, {});

    for (const key in initialGroup) {
      jjhList.timelineList.forEach((timeline: JJHTimelineModel) => {
        function setJJH(timeline: JJHTimelineModel) {
          const { title, id, state, jjhNumber, endDate, startDate } = timeline;
          if (jjhNumber === currentJJH) setCurrentGroup(key);
          initialGroup[key].push({
            category: key,
            number: id,
            jjhNumber: jjhNumber,
            title: `${title} 연표`,
            state: state,
            type: 'timeline',
            onClick: () =>
              navigate(
                `/jeong-ju-haeng/timeline?jjh=${jjhNumber}&timeline=${id}&title=${title} 연표&date=${getDate(startDate).year} ~ ${getDate(endDate).year}`,
              ),
          });
        }
        if (
          timeline.era.includes('삼국') &&
          key.includes('삼국') &&
          !timeline.title.includes('남북국')
        ) {
          setJJH(timeline);
        }
        if (
          timeline.era.includes('남북국') &&
          key.includes('남북국') &&
          !timeline.title.includes('전성기') &&
          !timeline.title.includes('삼국')
        ) {
          setJJH(timeline);
        }
        if (timeline.era.includes('고려') && key.includes('고려')) {
          setJJH(timeline);
        }
        if (timeline.era.includes('조선') && key.includes('조선')) {
          setJJH(timeline);
        }
        if (timeline.era.includes('개항') && key.includes('개항')) {
          setJJH(timeline);
        }
        if (timeline.era.includes('일제') && key.includes('일제')) {
          setJJH(timeline);
        }
        if (timeline.era.includes('현대') && key.includes('현대')) {
          setJJH(timeline);
        }
      });
    }

    const groupState = (group: JJHModel[]): ContentState => {
      const states = group.reduce((acc: Set<ContentState>, item: JJHModel) => {
        acc.add(item.state);
        return acc;
      }, new Set<ContentState>());

      if (states.has('InProgress')) return 'InProgress';
      if (states.has('Complete')) return 'Complete';
      return 'Locked';
    };

    const finalGroup: FinalGroup = Object.keys(initialGroup).reduce(
      (acc: FinalGroup, key: string) => {
        acc[key] = {
          items: initialGroup[key],
          state: groupState(initialGroup[key]),
        };
        return acc;
      },
      {},
    );

    return finalGroup;
  }, [jjhList, navigate, currentJJH]);

  const { next, prev, current } = useMemo(() => {
    const nextJJHNumber = currentJJH + 1;
    const prevJJHNumber = currentJJH - 1;

    let current: JJHModel | undefined;
    let next: JJHModel | undefined;
    let prev: JJHModel | undefined;

    for (const groupKey in groupedByDateComment) {
      const group = groupedByDateComment[groupKey];

      group.items.forEach((item) => {
        if (item.jjhNumber === nextJJHNumber) {
          next = item;
        }
        if (item.jjhNumber === prevJJHNumber) {
          prev = item;
        }
        if (item.jjhNumber === currentJJH) {
          current = item;
        }
      });
    }

    return { next, prev, current };
  }, [currentJJH, groupedByDateComment]);

  return {
    groupedJJHList: groupedByDateComment,
    currentJJHList: groupedByDateComment
      ? groupedByDateComment[currentGroup]
      : null,
    prevJJH: prev,
    nextJJH: next,
    currentJJH: current,
    isLoading,
    isError,
    error,
  };
}
