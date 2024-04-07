import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Button from '@/share/ui/button/Button';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Icon from '@/share/ui/icon/Icon';
import Keyword from '@/share/ui/keyword/Keyword';
import Timeline from '@/share/ui/timeline/Timeline';
import {
  useGetChapterTopicListQuery,
  useGetContentListQuery,
} from '@/store/api/jjhApi';

import QuizButton from './QuizButton';

export default function JJHTopicList() {
  const { chapter: chapterNumber, jjh: jjhNumber } = useQuesryString();
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const { data: contentList } = useGetContentListQuery(jjhNumber);

  return (
    <Async data={contentList}>
      {(data) => (
        <>
          {[...data]
            .sort((a, b) => a.contentNumber - b.contentNumber)
            .map((topic) => {
              const { title, dateComment, state, content } = topic;
              const keywordList =
                topicList?.find((topic) => topic.title === title)
                  ?.keywordList || [];

              if (content === 'CHAPTER_COMPLETE_QUESTION') {
                return (
                  <ContentBox
                    key={title}
                    title="단원 마무리 문제"
                    lock={state === 'Locked'}
                    extraButton={<QuizButton />}
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
                  extraButton={
                    <Button>
                      <Icon icon="exam" size={14} />
                      &nbsp; <span style={{ marginTop: '3px' }}>문제 풀이</span>
                    </Button>
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
