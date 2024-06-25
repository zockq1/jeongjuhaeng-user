import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Menu from '@/share/ui/menu/Menu';
import MenuSkeleton from '@/share/ui/menu/MenuSkeleton';
import getDate from '@/share/util/getDate';
import { useGetTimelineListQuery } from '@/store/api/timelineApi';

export default function TimelineSideMenu() {
  const navigate = useNavigate();
  const { timeline: currentTimeline } = useQuesryString();
  const {
    data: timelineList,
    isLoading,
    isError,
    error,
  } = useGetTimelineListQuery();

  return (
    <Async
      data={timelineList}
      isLoading={isLoading}
      isError={isError}
      loadingComponent={<MenuSkeleton count={12} />}
      errorComponent={
        <ErrorUI error={error} message="연표 목록 불러오기에 실패하였습니다." />
      }
    >
      {(timelineList) => (
        <Menu>
          {[...timelineList]
            .sort((a, b) => a.startDate - b.startDate)
            .map((timeline) => (
              <Menu.Item
                key={timeline.id}
                selected={currentTimeline === timeline.id}
                onClick={() =>
                  navigate(
                    `/timeline?timeline=${timeline.id}&title=${
                      timeline.title
                    }&date=${getDate(timeline.startDate).year} ~ ${getDate(timeline.endDate).year}`,
                  )
                }
              >
                {`${timeline.title}`}
                {`(${getDate(timeline.startDate).year} ~ ${getDate(timeline.endDate).year})`}
              </Menu.Item>
            ))}
        </Menu>
      )}
    </Async>
  );
}
