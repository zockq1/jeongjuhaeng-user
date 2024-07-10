import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Menu from '@/share/ui/menu/Menu';
import MenuSkeleton from '@/share/ui/menu/MenuSkeleton';
import { useGetChapterListQuery } from '@/store/api/chapterApi';
import { ChapterModel } from '@/types/chapterTypes';

export default function ChapterSideMenu() {
  const { chapterId } = useParams();
  const {
    data: chapterList,
    isLoading,
    isError,
    error,
  } = useGetChapterListQuery();

  const groupedByDateComment = useMemo(() => {
    return chapterList?.reduce<{
      [key: string]: ChapterModel[];
    }>((acc, current) => {
      const key = current.dateComment;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(current);
      return acc;
    }, {});
  }, [chapterList]);

  const currentDateComment = useMemo(() => {
    return chapterList?.find((chapter) => chapter.number === Number(chapterId))
      ?.dateComment;
  }, [chapterList, chapterId]);

  return (
    <Async
      data={groupedByDateComment}
      isLoading={isLoading}
      isError={isError}
      loadingComponent={<MenuSkeleton count={8} />}
      errorComponent={
        <ErrorUI error={error} message="단원 목록 불러오기에 실패하였습니다." />
      }
    >
      {(groupedByDateComment) => (
        <Menu>
          {Object.entries(groupedByDateComment).map(
            ([dateComment, chapters]) => (
              <Menu.Group
                key={dateComment}
                title={`${dateComment} (${chapters.length})`}
                open={currentDateComment === dateComment}
                length={chapters.length}
              >
                {chapters.map((chapter: ChapterModel) => (
                  <Menu.Item
                    key={chapter.number}
                    selected={Number(chapterId) === chapter.number}
                    to={`/chapter/${chapter.number}`}
                  >
                    {`${chapter.title} (${chapter.topicCount})`}
                  </Menu.Item>
                ))}
              </Menu.Group>
            ),
          )}
        </Menu>
      )}
    </Async>
  );
}
