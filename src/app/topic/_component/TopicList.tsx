import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Keyword from '@/share/ui/keyword/Keyword';
import Timeline from '@/share/ui/timeline/Timeline';
import { useGetChapterTopicListQuery } from '@/store/api/jjhApi';

export default function TopicList() {
  const { chapter: chapterNumber } = useQuesryString();
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);

  return (
    <Async data={topicList}>
      {(data) => (
        <>
          {data.map((topic) => {
            const { title, keywordList, dateComment } = topic;
            return (
              <ContentBox key={title} title={title} subTitle={dateComment}>
                {keywordList
                  .filter((keyword) => !keyword.dateComment)
                  .sort((a, b) => a.number - b.number)
                  .map((keyword, index) => (
                    <Keyword
                      key={index}
                      comment={keyword.comment}
                      file={keyword.file}
                    >
                      {keyword.name}
                    </Keyword>
                  ))}
                <Timeline>
                  {keywordList
                    .filter((keyword) => !!keyword.dateComment)
                    .sort((a, b) => a.number - b.number)
                    .map((keyword, index, arr) => {
                      return (
                        <Timeline.Item
                          dateItem={{
                            date:
                              arr[index - 1] &&
                              arr[index - 1].dateComment === keyword.dateComment
                                ? ''
                                : keyword.dateComment,
                            title: keyword.name,
                            comment: keyword.comment
                              .trim()
                              .split('.')
                              .filter(Boolean),
                            file: keyword.file,
                          }}
                          key={index}
                        />
                      );
                    })}
                </Timeline>
              </ContentBox>
            );
          })}
        </>
      )}
    </Async>
  );
}
