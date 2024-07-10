import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Menu from '@/share/ui/menu/Menu';
import MenuSkeleton from '@/share/ui/menu/MenuSkeleton';
import { getFormattedDateRange } from '@/share/util/getDate';
import { useGetTimelineListQuery } from '@/store/api/timelineApi';

export default function TimelineSideMenu() {
  const { timelineId } = useParams();
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
                selected={Number(timelineId) === timeline.id}
                to={`/timeline/${timeline.id}`}
              >
                <div>
                  <Era>{timeline.title}</Era>
                  <Date>
                    {getFormattedDateRange(
                      timeline.startDate,
                      timeline.endDate,
                    )}
                  </Date>
                </div>
              </Menu.Item>
            ))}
        </Menu>
      )}
    </Async>
  );
}

const Era = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
