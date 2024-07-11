import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Icon from '@/share/ui/icon/Icon';
import Menu from '@/share/ui/menu/Menu';
import MenuSkeleton from '@/share/ui/menu/MenuSkeleton';
import getColorAndIcon from '@/share/util/getColorAndIcon';

import useGetJJHCategory from '../_hook/useGetJJHCategory';

export default function JJHSideMenu() {
  const { groupedJJHList, curr, isLoading, isError, error } =
    useGetJJHCategory();

  return (
    <Async
      data={groupedJJHList}
      isLoading={isLoading}
      isError={isError}
      loadingComponent={<MenuSkeleton count={8} />}
      errorComponent={
        <ErrorUI
          error={error}
          message="정주행 목록 불러오기에 실패하였습니다."
        />
      }
    >
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
                  open={curr?.category === dateComment}
                  length={chapters.items.length}
                  color={color}
                  lock={chapters.state === 'Locked'}
                >
                  {[...chapters.items]
                    .sort((a, b) => a.jjhNumber - b.jjhNumber)
                    .map((chapter) => {
                      const { jjhNumber, title, state, to } = chapter;
                      const { color, icon } = getColorAndIcon(state);
                      return (
                        <Menu.Item
                          key={jjhNumber}
                          selected={curr?.jjhNumber === jjhNumber}
                          to={to}
                          color={color}
                          lock={state === 'Locked'}
                        >
                          <Icon icon={icon} size={10} />
                          &nbsp;{title}&nbsp;
                          {title.includes('연표') && (
                            <Icon icon="timeline" size={12} />
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
