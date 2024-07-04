import { useReducer } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import QuizResultButton from '@/share/quiz/QuizResultButton';
import Timeline from '@/share/timeline/Timeline';
import Icon from '@/share/ui/icon/Icon';
import { useUpdateTimelineWrongCounterMutation } from '@/store/api/timelineApi';
import { RootState } from '@/store/store';
import { TimeLineItemModel } from '@/types/timelinetypes';

import TimelineBoard from './TimelineBoard';
import TimelineScore from './TimelineScore';

interface TimelineQuestionProps {
  dateList: TimeLineItemModel[];
  onNextContent: () => void;
  id: number;
  onFinish?: () => void;
}

type Select = {
  position: 'first' | 'middle' | 'last';
  isWrong: boolean;
  date: number;
};

type State = {
  nextDateList: TimeLineItemModel[];
  playedDateList: (TimeLineItemModel | Select)[];
  wrongCount: number;
  isFinish: boolean;
  keyCount: number; //선택 버튼 key
};

const SELECT_FIRST = 'SELECT_FIRST';
const SELECT_MIDDLE = 'SELECT_MIDDLE';
const SELECT_LAST = 'SELECT_LAST';
const WRONG_SELECT = 'WRONG_SELECT';

type Action =
  | { type: 'SELECT_FIRST' }
  | { type: 'SELECT_MIDDLE'; index: number }
  | { type: 'SELECT_LAST' }
  | { type: 'WRONG_SELECT'; index: number }
  | { type: 'FINISH' };

const reducer = (state: State, action: Action): State => {
  const { playedDateList, nextDateList, wrongCount, keyCount } = state;
  switch (action.type) {
    case SELECT_FIRST: {
      return {
        ...state,
        playedDateList: [
          { position: 'first', isWrong: false, date: keyCount },
          nextDateList[0],
          { position: 'middle', isWrong: false, date: keyCount + 1 },
          ...playedDateList
            .slice(1)
            .map((item) =>
              'isWrong' in item ? { ...item, isWrong: false } : item,
            ),
        ],
        nextDateList: nextDateList.slice(1),
        isFinish: nextDateList.length === 1,
        keyCount: keyCount + 2,
      };
    }
    case SELECT_LAST: {
      return {
        ...state,
        playedDateList: [
          ...playedDateList
            .slice(0, -1)
            .map((item) =>
              'isWrong' in item ? { ...item, isWrong: false } : item,
            ),
          { position: 'middle', isWrong: false, date: keyCount },
          nextDateList[0],
          { position: 'last', isWrong: false, date: keyCount + 1 },
        ],
        nextDateList: nextDateList.slice(1),
        isFinish: nextDateList.length === 1,
        keyCount: keyCount + 2,
      };
    }
    case SELECT_MIDDLE: {
      const index = action.index;
      return {
        ...state,
        playedDateList: [
          ...playedDateList
            .slice(0, index)
            .map((item) =>
              'isWrong' in item ? { ...item, isWrong: false } : item,
            ),
          { position: 'middle', isWrong: false, date: keyCount },
          nextDateList[0],
          { position: 'middle', isWrong: false, date: keyCount + 1 },
          ...playedDateList
            .slice(index + 1)
            .map((item) =>
              'isWrong' in item ? { ...item, isWrong: false } : item,
            ),
        ],
        nextDateList: nextDateList.slice(1),
        isFinish: nextDateList.length === 1,
        keyCount: keyCount + 2,
      };
    }
    case WRONG_SELECT: {
      return {
        ...state,
        playedDateList: playedDateList.map((item, index) => {
          if ('isWrong' in item && index === action.index) {
            return {
              ...item,
              isWrong: true,
            };
          }
          return item;
        }),
        wrongCount: wrongCount + 1,
      };
    }
    default:
      return state;
  }
};

export default function TimelineQuiz({
  dateList,
  onNextContent,
  id,
  onFinish,
}: TimelineQuestionProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [updateTimelineWrongCounter] = useUpdateTimelineWrongCounterMutation();
  const [state, dispatch] = useReducer(reducer, {
    playedDateList: [
      { position: 'first', isWrong: false, date: 0 },
      dateList[0],
      { position: 'last', isWrong: false, date: 1 },
    ],
    nextDateList: dateList.slice(1),
    wrongCount: 0,
    isFinish: dateList.length === 0,
    keyCount: 2,
  });
  const { playedDateList, nextDateList, wrongCount, isFinish } = state;

  const fetchResult = () => {
    if (isLoggedIn) {
      updateTimelineWrongCounter({
        id: id,
        wrongCount: wrongCount,
        correctCount: 10,
      });

      if (wrongCount <= 2) {
        onFinish && onFinish();
      }
    }
  };

  const handleSelect = (select: Select, index: number) => {
    if (select.isWrong) return;

    if (select.position === 'first') {
      const isCorrect = nextDateList[0].date <= playedDateList[1].date;
      if (isCorrect) {
        dispatch({ type: SELECT_FIRST });
        nextDateList.length === 1 && fetchResult();
        return;
      }
    }

    if (select.position === 'last') {
      const isCorrect =
        nextDateList[0].date >= playedDateList[playedDateList.length - 2].date;
      if (isCorrect) {
        dispatch({ type: SELECT_LAST });
        nextDateList.length === 1 && fetchResult();
        return;
      }
    }

    if (select.position === 'middle') {
      const isCorrect =
        nextDateList[0].date >= playedDateList[index - 1].date &&
        nextDateList[0].date <= playedDateList[index + 1].date;
      if (isCorrect) {
        dispatch({ type: SELECT_MIDDLE, index });
        nextDateList.length === 1 && fetchResult();
        return;
      }
    }

    dispatch({ type: WRONG_SELECT, index });
  };

  return (
    <>
      {isFinish ? (
        <TimelineScore wrongCount={wrongCount} />
      ) : (
        <div style={{ position: 'relative' }}>
          <TimelineBoard
            total={dateList.length}
            wrong={wrongCount}
            nextDate={nextDateList[0].comment}
            played={(playedDateList.length - 1) / 2}
          />
          <TimelineQuizContainer>
            <Timeline>
              {playedDateList.map((timeline, index) => {
                if ('position' in timeline)
                  return (
                    <Timeline.Button
                      key={timeline.date}
                      onClick={() => handleSelect(timeline, index)}
                      color={timeline.isWrong ? 'red' : 'black'}
                    >
                      {timeline.isWrong ? (
                        <Icon icon="fail" size={20} />
                      ) : (
                        <Icon icon="check" size={20} />
                      )}
                    </Timeline.Button>
                  );
                return (
                  <Timeline.Item
                    dateItem={{
                      date: timeline.dateComment,
                      title: timeline.comment,
                      comment: timeline.keywordList,
                    }}
                    key={timeline.comment}
                    isQuestion
                  />
                );
              })}
            </Timeline>
          </TimelineQuizContainer>
        </div>
      )}
      {isFinish && (
        <QuizResultButton
          isSuccess={wrongCount <= 4}
          onNextContent={onNextContent}
        />
      )}
    </>
  );
}

const TimelineQuizContainer = styled.div`
  overflow: hidden;

  margin: 5px;
  margin-top: 15px;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};
`;
