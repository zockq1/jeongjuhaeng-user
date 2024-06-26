import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import { useGetChapterTopicListQuery } from '@/store/api/topicApi';

export default function TopicList() {
  const { chapter: chapterNumber } = useQuesryString();
  const {
    data: topicList,
    isFetching,
    isError,
    error,
  } = useGetChapterTopicListQuery(chapterNumber);

  return (
    <Async
      data={topicList}
      isLoading={isFetching}
      isError={isError}
      loadingComponent={<ContentBoxSkeleton />}
      errorComponent={
        <ErrorUI error={error} message="주제 불러오기에 실패하였습니다." />
      }
    >
      {(data) => (
        <>
          {data.map((topic) => {
            const { title, keywordList, dateComment } = topic;
            return (
              <ContentBox key={title} title={title} subTitle={dateComment}>
                <Timeline>
                  {keywordList
                    .filter((keyword) => !keyword.dateComment)
                    .sort((a, b) => a.number - b.number)
                    .map((keyword, index) => (
                      <Timeline.Item
                        dateItem={{
                          date: '',
                          title: keyword.name,
                          comment: keyword.comment
                            .trim()
                            .split('.')
                            .filter(Boolean),
                          file: keyword.file,
                        }}
                        key={index}
                      />
                    ))}
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
