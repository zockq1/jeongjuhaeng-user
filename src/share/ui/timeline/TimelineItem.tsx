import styled from 'styled-components';

import Keyword from '../keyword/Keyword';

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | string | null;
    keywordList: string[] | null;
    file?: string;
  };
  isQuestion?: boolean;
}

export default function TimelineItem({
  dateItem,
  isQuestion = false,
}: TimelineTopicProps) {
  const { comment, date, keywordList, file } = dateItem;
  return (
    <>
      <TimelineItemContainer $isQuestion={isQuestion}>
        <InnerCircle $visible={date !== ''} />
        <div>
          {date && (
            <Date>
              {typeof date === 'number'
                ? Math.floor(Number(date) / 10000)
                : date?.split('/')[0]}
              {typeof date !== 'number' && date?.split('/')[1] && (
                <span className="king">{` (${date?.split('/')[1]})`}</span>
              )}
            </Date>
          )}
          <Keyword
            comment={keywordList?.join('.') || ''}
            file={file}
            commentOff={isQuestion}
          >
            {comment}
          </Keyword>
        </div>
      </TimelineItemContainer>
    </>
  );
}

interface StyledTimelineItemProps {
  $isQuestion?: boolean;
}

const TimelineItemContainer = styled.li<StyledTimelineItemProps>`
  display: grid;
  align-items: top;

  /* margin: ${({ $isQuestion }) => ($isQuestion ? '30px 0' : '10px 0 5px')}; */

  grid-template-columns: 34px 1fr;
`;

const InnerCircle = styled.div<{ $visible: boolean }>`
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  position: relative;
  z-index: 9;

  width: 14px;
  height: 14px;
  margin: 10px;
  border: 4px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.bgBlue};
`;

const Date = styled.div`
  padding: 10px;
  padding-left: 8px;

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};

  overflow-y: hidden;

  word-break: keep-all;

  .king {
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
`;
