import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Menu from '@/share/ui/menu/Menu';
import { useGetChapterListQuery } from '@/store/api/chapterApi';
import { ChapterModel } from '@/types/chapterTypes';

export default function ChapterSideMenu() {
  const { chapter: currentChapter } = useQuesryString();
  const navigate = useNavigate();
  const { data: chapterList } = useGetChapterListQuery();

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
    return chapterList?.find((chapter) => chapter.number === currentChapter)
      ?.dateComment;
  }, [chapterList, currentChapter]);

  return (
    <Async data={groupedByDateComment}>
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
                    selected={currentChapter === chapter.number}
                    onClick={() =>
                      navigate(
                        `/learning/chapter?chapter=${chapter.number}&title=${chapter.title}`,
                      )
                    }
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
