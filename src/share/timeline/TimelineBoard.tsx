import styled from 'styled-components';

import { media } from '@/theme/theme';

import { Expanded } from '../layout/Responsive';

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
      <Expanded>
        <BoardBlock />
      </Expanded>
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
  height: 20px;

  background-color: ${({ theme }) => theme.colors.bg};
`;

const Board = styled.div`
  display: grid;
  z-index: 98;

  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  grid-template:
    'next count' 1fr
    'next wrong' 1fr / 80% 20%;

  @media ${media.mobile} {
    position: fixed;
    top: 60px;
    left: 0;

    width: 100%;
    height: 60px;
    border-top: 0;
    border-right: 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.textBlue};
    border-left: 0;
    border-radius: 0;
  }

  @media ${media.expanded} {
    position: sticky;
    top: 100px;

    height: 70px;
    margin: 5px;
    margin-bottom: 20px;
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

    grid-area: next;
  }

  & > div.count {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    color: ${({ theme }) => theme.colors.blue};

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
