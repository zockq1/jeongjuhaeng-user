import styled, { css, keyframes } from 'styled-components';

import Keyword from '../ui/keyword/Keyword';

interface TimelineTopicProps {
  dateItem: {
    title: string;
    date: number | string | null;
    comment: string[] | null;
    file?: string;
  };
  isQuestion?: boolean;
  disableComment?: boolean;
}

export default function TimelineItem({
  dateItem,
  disableComment,
  isQuestion = false,
}: TimelineTopicProps) {
  const { title, date, comment, file } = dateItem;
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
            comment={comment?.join('.') || ''}
            file={file}
            commentOff={isQuestion || disableComment}
          >
            {title}
          </Keyword>
        </div>
      </TimelineItemContainer>
    </>
  );
}

const slideDownFadeIn = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }

  to {
    max-height: 1000px;
    opacity: 1;
  }
`;

const TimelineItemContainer = styled.li<{
  $isQuestion?: boolean;
}>`
  display: grid;
  align-items: top;

  grid-template-columns: 34px 1fr;

  ${({ $isQuestion }) =>
    $isQuestion &&
    css`
      animation: ${slideDownFadeIn} 0.5s ease-out forwards;
    `};
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
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};

  overflow-y: hidden;

  word-break: keep-all;

  .king {
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
`;
