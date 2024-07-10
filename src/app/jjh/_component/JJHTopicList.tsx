import { useNavigate, useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import removeDuplicateDateComments from '@/share/util/removeDuplicateDateComments';
import splitByDot from '@/share/util/splitByDot';
import { useGetContentListQuery } from '@/store/api/jjhApi';
import { usePrefetch } from '@/store/api/questionApi';
import { useGetChapterTopicListQuery } from '@/store/api/topicApi';

import QuizButton from '../../../share/ui/button/QuizButton';

export default function JJHTopicList() {
  const navigate = useNavigate();
  const prefetchTtoK = usePrefetch('getTtoKQuestion');
  const prefetchKtoT = usePrefetch('getKtoTQuestion');
  const { jjhId, chapterId } = useParams();
  const { data: topicList, isLoading: topicLoading } =
    useGetChapterTopicListQuery(Number(chapterId));
  const {
    data: contentList,
    isLoading,
    isError,
    error,
  } = useGetContentListQuery(Number(jjhId));

  return (
    <Async
      data={contentList}
      isLoading={isLoading && topicLoading}
      isError={isError}
      loadingComponent={<ContentBoxSkeleton />}
      errorComponent={
        <ErrorUI
          error={error}
          message="정주행 주제 불러오기에 실패하였습니다."
        />
      }
    >
      {(data) => (
        <>
          {[...data]
            .sort((a, b) => a.contentNumber - b.contentNumber)
            .map((topic) => {
              const { title, dateComment, state, content, contentNumber } =
                topic;
              const keywordList =
                topicList?.find((topic) => topic.title === title)
                  ?.keywordList || [];

              if (content === 'CHAPTER_COMPLETE_QUESTION') {
                return (
                  <ContentBox
                    key={title}
                    title="단원 마무리 문제"
                    lock={state === 'Locked'}
                    run={state === 'InProgress'}
                    extraButton={
                      <QuizButton
                        onMouseOver={() => prefetchKtoT(Number(chapterId))}
                        onClick={() =>
                          navigate(
                            `/jeong-ju-haeng/${jjhId}/chapter/${chapterId}/${contentNumber}/chapterQuiz`,
                          )
                        }
                      />
                    }
                  >
                    {null}
                  </ContentBox>
                );
              }

              return (
                <ContentBox
                  key={title}
                  title={title}
                  subTitle={dateComment}
                  lock={state === 'Locked'}
                  run={state === 'InProgress'}
                  extraButton={
                    <QuizButton
                      onMouseOver={() => prefetchTtoK(title)}
                      onClick={() =>
                        navigate(
                          `/jeong-ju-haeng/${jjhId}/chapter/${chapterId}/${contentNumber}/topicQuiz/${title}`,
                        )
                      }
                    />
                  }
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
            })}
        </>
      )}
    </Async>
  );
}
