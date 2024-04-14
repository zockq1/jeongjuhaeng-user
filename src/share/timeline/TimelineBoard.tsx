import styled from 'styled-components';

import { media } from '@/theme/theme';

interface TimelineBoardProps {
  nextDate: string;
  total: number;
  wrong: number;
  played: number;
}

export default function TimelineBoard({
  nextDate,
  total,
  wrong,
  played,
}: TimelineBoardProps) {
  return (
    <>
      <BoardBlock />
      <Board>
        <div className="next">{nextDate}</div>
        <div className="count">{`배치: ${played}/${total}`}</div>
        <div className="wrong">{`오답: ${wrong}`}</div>
      </Board>
    </>
  );
}

const BoardBlock = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 99;

  width: 100%;
  height: 30px;

  background-color: ${({ theme }) => theme.colors.bg};

  @media ${media.mobile} {
    top: 60px;
    height: 50px;
  }
`;

const Board = styled.div`
  display: grid;
  z-index: 100;

  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  grid-template:
    'next count' 1fr
    'next wrong' 1fr / 70% 30%;

  @media ${media.mobile} {
    position: sticky;
    top: 100px;

    height: 70px;
    margin: 5px;
  }

  @media ${media.expanded} {
    position: sticky;
    top: 100px;

    height: 60px;
    margin: 0 5px 15px;
  }

  & > div.next {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    border-right: 2px solid ${({ theme }) => theme.colors.textBlue};

    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSizes.large};
    text-align: center;

    grid-area: next;
    word-break: keep-all;
  }

  & > div.count {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.colors.blue};
    text-align: center;

    grid-area: count;
  }

  & > div.wrong {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    border-top: 2px solid ${({ theme }) => theme.colors.textBlue};

    color: ${({ theme }) => theme.colors.red};

    grid-area: wrong;
  }
`;
