import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Keyword from '@/share/ui/keyword/Keyword';
import {
  useGetChapterTopicListQuery,
  useGetContentListQuery,
} from '@/store/api/jjhApi';

import QuizButton from '../../quiz/_component/QuizButton';

export default function JJHTopicList() {
  const navigate = useNavigate();
  const { chapter: chapterNumber, jjh: jjhNumber } = useQuesryString();
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const {
    data: contentList,
    isLoading,
    isError,
  } = useGetContentListQuery(jjhNumber);

  return (
    <Async data={contentList} isLoading={isLoading} isError={isError}>
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
                    extraButton={
                      <QuizButton
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
                      onClick={() =>
                        navigate(
                          `/jeong-ju-haeng/topic/quiz?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${title}&content=${contentNumber}&title=${title}`,
                        )
                      }
                    />
                  }
                >
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
