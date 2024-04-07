import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Icon from '@/share/ui/icon/Icon';
import Menu from '@/share/ui/menu/Menu';
import getColorAndIcon from '@/share/util/getColorAndIcon';
import getDate from '@/share/util/getDate';
import { useGetJJHListQuery } from '@/store/api/jjhApi';
import { ContentState, JJHTimelineModel } from '@/types/jjhTypes';

interface JJHModel {
  number: number;
  jjhNumber: number;
  title: string;
  state: ContentState;
  onClick: () => void;
}

interface FinalGroup {
  [key: string]: {
    items: JJHModel[];
    state: ContentState;
  };
}

export default function JJHSideMenu() {
  const { jjh: currentJJH } = useQuesryString();
  const navigate = useNavigate();
  const { data: jjhList } = useGetJJHListQuery();

  const groupedByDateComment = useMemo(() => {
    if (!jjhList) return;

    const initialGroup = [...jjhList.chapterList]
      .sort((a, b) => a.number - b.number)
      .reduce<{
        [key: string]: JJHModel[];
      }>((acc, current) => {
        const { dateComment, title, number, state, jjhNumber } = current;
        const key = dateComment;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push({
          number: number,
          jjhNumber: jjhNumber,
          title: title,
          state: state,
          onClick: () =>
            navigate(
              `/jeong-ju-haeng/chapter?jjh=${jjhNumber}&chapter=${number}&title=${title}`,
            ),
        });
        return acc;
      }, {});

    for (const key in initialGroup) {
      jjhList.timelineList.forEach((timeline) => {
        function setJJH(timeline: JJHTimelineModel) {
          const { title, id, state, jjhNumber, endDate, startDate } = timeline;
          initialGroup[key].push({
            number: id,
            jjhNumber: jjhNumber,
            title: `${title} 연표`,
            state: state,
            onClick: () =>
              navigate(
                `/jeong-ju-haeng/timeline?jjh=${jjhNumber}&timeline=${id}&title=${title}&date=${getDate(startDate).year} ~ ${getDate(endDate).year}`,
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
  }, [jjhList, navigate]);

  const currentDateComment = useMemo(() => {
    return jjhList?.chapterList.find(
      (chapter) => chapter.jjhNumber === currentJJH,
    )?.dateComment;
  }, [jjhList, currentJJH]);

  return (
    <Async data={groupedByDateComment}>
      {(groupedByDateComment) => (
        <Menu>
          {Object.entries(groupedByDateComment).map(
            ([dateComment, chapters]) => {
              const { color, icon } = getColorAndIcon(chapters.state);
              return (
                <Menu.Group
                  key={dateComment}
                  title={
                    <>
                      <Icon icon={icon} size={14} />
                      &nbsp;{dateComment}
                    </>
                  }
                  open={currentDateComment === dateComment}
                  length={chapters.items.length}
                  color={color}
                  lock={chapters.state === 'Locked'}
                >
                  {[...chapters.items]
                    .sort((a, b) => a.jjhNumber - b.jjhNumber)
                    .map((chapter: JJHModel) => {
                      const { number, jjhNumber, title, state, onClick } =
                        chapter;
                      const { color, icon } = getColorAndIcon(state);
                      return (
                        <Menu.Item
                          key={number}
                          selected={currentJJH === jjhNumber}
                          onClick={onClick}
                          color={color}
                          lock={state === 'Locked'}
                        >
                          <Icon icon={icon} size={10} />
                          &nbsp;{title}&nbsp;
                          {title.includes('연표') && (
                            <Icon icon="TIMELINE_QUESTION" size={12} />
                          )}
                        </Menu.Item>
                      );
                    })}
                </Menu.Group>
              );
            },
          )}
        </Menu>
      )}
    </Async>
  );
}
