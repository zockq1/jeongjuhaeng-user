import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import { useGetContentListQuery } from '@/store/api/jjhApi';
import { usePrefetch } from '@/store/api/questionApi';
import { useGetChapterTopicListQuery } from '@/store/api/topicApi';

import QuizButton from '../../../share/ui/button/QuizButton';

export default function JJHTopicList() {
  const navigate = useNavigate();
  const prefetchTtoK = usePrefetch('getTtoKQuestion');
  const prefetchKtoT = usePrefetch('getKtoTQuestion');
  const { chapter: chapterNumber, jjh: jjhNumber } = useQuesryString();
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const {
    data: contentList,
    isLoading,
    isError,
    error,
  } = useGetContentListQuery(jjhNumber);

  return (
    <Async
      data={contentList}
      isLoading={isLoading}
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
                        onMouseOver={() => prefetchKtoT(chapterNumber)}
                        onClick={() =>
                          navigate(
                            `/jeong-ju-haeng/chapter/quiz?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${contentNumber}&title=${title}`,
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
                          `/jeong-ju-haeng/topic/quiz?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${title}&content=${contentNumber}&title=${title}`,
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
                                arr[index - 1].dateComment ===
                                  keyword.dateComment
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
