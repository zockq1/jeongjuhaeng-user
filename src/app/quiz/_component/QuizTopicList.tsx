import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import removeDuplicateDateComments from '@/share/util/removeDuplicateDateComments';
import splitByDot from '@/share/util/splitByDot';
import { useGetQuestionCategoryTopicListQuery } from '@/store/api/topicApi';

export default function QuizTopicList() {
  const { chapter: chapterNumber } = useQuesryString();
  const {
    data: topicList,
    isError,
    isFetching,
    error,
  } = useGetQuestionCategoryTopicListQuery(chapterNumber);

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
          {data.map((chapter) => {
            return chapter.topicList.map((topic) => {
              const { title, keywordList, dateComment } = topic;
              return (
                <ContentBox
                  key={title}
                  title={title}
                  subTitle={chapter.chapterTitle + ' - ' + dateComment}
                >
                  <Timeline>
                    {keywordList
                      .filter((keyword) => !keyword.dateComment)
                      .sort((a, b) => a.number - b.number)
                      .map((keyword, index) => (
                        <Timeline.Item
                          dateItem={{
                            date: '',
                            title: keyword.name,
                            comment: splitByDot(keyword.comment),
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
                              date: removeDuplicateDateComments(
                                keyword,
                                index,
                                arr,
                              ),
                              title: keyword.name,
                              comment: splitByDot(keyword.comment),
                              file: keyword.file,
                            }}
                            key={index}
                          />
                        );
                      })}
                  </Timeline>
                </ContentBox>
              );
            });
          })}
        </>
      )}
    </Async>
  );
}
