import { useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import removeDuplicateDateComments from '@/share/util/removeDuplicateDateComments';
import splitByDot from '@/share/util/splitByDot';
import { useGetChapterTopicListQuery } from '@/store/api/topicApi';

export default function TopicList() {
  const { chapterId } = useParams();
  const {
    data: topicList,
    isLoading,
    isError,
    error,
  } = useGetChapterTopicListQuery(Number(chapterId));

  return (
    <Async
      data={topicList}
      isLoading={isLoading}
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
          })}
        </>
      )}
    </Async>
  );
}
