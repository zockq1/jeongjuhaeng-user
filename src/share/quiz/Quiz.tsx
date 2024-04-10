import { useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';

import cheomseongdae from '@/assets/images/cheomseongdae.svg';
import flag from '@/assets/images/flag.svg';
import gyeongbokgung from '@/assets/images/gyeongbokgung.svg';
import hat from '@/assets/images/hat.svg';
import kingSejong from '@/assets/images/king-sejong.svg';
import mask from '@/assets/images/mask.svg';
import ChoiceList from '@/share/quiz/choice/ChoiceList';
import Description from '@/share/quiz/Description';
import QuizLayout from '@/share/quiz/QuizLayout';
import QuizNavigation from '@/share/quiz/QuizNavigation';
import Score from '@/share/quiz/Score';
import UpdateScore from '@/share/quiz/UpdateScore';
import ButtonGroup from '@/share/ui/button/ButtonGroup';
import Icon from '@/share/ui/icon/Icon';
import { useUpdateKeywordWrongCounterMutation } from '@/store/api/questionApi';
import { RootState } from '@/store/store';
import {
  QuestionModel,
  QuizModel,
  WrongCounterModel,
} from '@/types/questionTypes';

import QuizResultButton from './QuizResultButton';

const images = [flag, hat, mask, cheomseongdae, gyeongbokgung, kingSejong];

interface QuestionProps {
  quizList: QuizModel[];
  onNextContent: () => void;
  onFinish?: () => void;
  isJJH?: boolean;
}

type State = {
  questionList: QuestionModel[];
  isFinish: boolean;
  currentNumber: number;
  score: number;
  keywordList: Map<number, { wrongCount: number; correctCount: number }>; //퀴즈 모드만
};

const SELECT_CHOICE = 'SELECT_CHOICE';
const FINISH = 'FINISH';
const NEXT_QUESTION = 'NEXT_QUESTION';
const CHECK_ANSWER = 'CHECK_ANSWER';
const MOVE_QUESTION = 'MOVE_QUESTION';

export type Action =
  | {
      type: 'SELECT_CHOICE';
      checkedChoiceKey: string;
    }
  | { type: 'CHECK_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH' }
  | { type: 'MOVE_QUESTION'; moveQuestionNumber: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SELECT_CHOICE: {
      if (state.questionList[state.currentNumber].isFinish) {
        return state;
      }
      const updatedQuestionListSelect = state.questionList.map(
        (item, index) => {
          if (index === state.currentNumber) {
            //체크된 곳 다시 눌렀을 때
            if (item.checkedChoiceKey === action.checkedChoiceKey) {
              return {
                ...item,
                checkedChoiceKey: '',
                isChecked: false,
                isCorrect: false,
              };
            }
            return {
              ...item,
              checkedChoiceKey: action.checkedChoiceKey,
              isChecked: true,
              isCorrect: item.answer === action.checkedChoiceKey.substring(1),
            };
          }
          return item;
        },
      );
      return { ...state, questionList: updatedQuestionListSelect };
    }

    case CHECK_ANSWER: {
      let score = state.score;
      const updatedQuestionListCheck = state.questionList.map((item, index) => {
        if (index === state.currentNumber) {
          //맞았으면 점수 증가
          if (item.isCorrect) score += 1;
          //키워드별 정답, 오답 횟수 기록
          if (item.keywordIdList && item.keywordIdList.length > 0) {
            item.keywordIdList.forEach((keywordId) => {
              const keyword = state.keywordList.get(keywordId);
              if (keyword) {
                item.isCorrect
                  ? (keyword.correctCount += 1)
                  : (keyword.wrongCount += 1);
                state.keywordList.set(keywordId, keyword);
              }
            });
          }

          return { ...item, isFinish: true };
        }
        return { ...item, score };
      });

      return {
        ...state,
        score,
        questionList: updatedQuestionListCheck,
      };
    }

    case NEXT_QUESTION: {
      const updatedQuestionListNext = state.questionList.map((item, index) => {
        if (index === state.currentNumber + 1) {
          return { ...item, isOpen: true };
        }
        return item;
      });
      return {
        ...state,
        questionList: updatedQuestionListNext,
        currentNumber: state.currentNumber + 1,
      };
    }

    case MOVE_QUESTION:
      if (
        action.moveQuestionNumber < state.questionList.length &&
        !state.questionList[action.moveQuestionNumber].isOpen
      )
        return state;
      return { ...state, currentNumber: action.moveQuestionNumber };

    case FINISH:
      return {
        ...state,
        isFinish: true,
        currentNumber: state.currentNumber + 1,
      };

    default:
      return state;
  }
};

function createQuestion(question: QuizModel, index: number): QuestionModel {
  const {
    questionType,
    answer,
    choiceList,
    choiceType,
    description,
    keywordIdList,
    descriptionFile,
  } = question;

  return {
    id: index,
    number: index + 1,
    questionType,
    choiceType,
    descriptionList: descriptionFile ? descriptionFile : description,
    descriptionCommentList: descriptionFile
      ? description.map((item) => {
          return {
            comment: item,
            icon: <Icon icon="check" size={12} />,
            type: 'Keyword',
          };
        })
      : [],
    choiceList: [...choiceList]
      .sort(() => Math.random() - 0.5)
      .map((choice) => {
        return {
          choice: choice.file || choice.choice,
          key: choice.key,
          commentList:
            questionType === 'TtoK' && choiceType === 'Image'
              ? [
                  {
                    comment: choice.key,
                    icon: <Icon icon="description" size={12} />,
                    type: 'Comment',
                  },
                  {
                    comment: choice.choice,
                    icon: <Icon icon="check" size={12} />,
                    type: 'Comment',
                  },
                ]
              : questionType === 'TtoK'
                ? [
                    {
                      comment: choice.key,
                      icon: <Icon icon="check" size={12} />,
                      type: 'Comment',
                    },
                  ]
                : [],
        };
      }),
    answer,
    checkedChoiceKey: '',
    isCorrect: false,
    isChecked: false,
    isFinish: false,
    isOpen: index === 0 ? true : false,
    score: 0,
    keywordIdList,
  };
}

function getKeywordList(
  quizList: QuizModel[],
): Map<number, { wrongCount: number; correctCount: number }> {
  const newMap = new Map<
    number,
    { wrongCount: number; correctCount: number }
  >();
  quizList.forEach((quiz) => {
    if (!quiz.keywordIdList) return newMap;
    quiz.keywordIdList.forEach((keywordId) => {
      newMap.set(keywordId, { wrongCount: 0, correctCount: 0 });
    });
  });
  return newMap;
}

function Quiz({
  quizList,
  onNextContent,
  onFinish,
  isJJH = false,
}: QuestionProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [updateKeywordWrongCount, { data: updateScoreList }] =
    useUpdateKeywordWrongCounterMutation();
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...quizList]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => createQuestion(item, index)),
    isFinish: false,
    currentNumber: 0,
    score: 0,
    keywordList: getKeywordList(quizList),
  });
  const { questionList, currentNumber, keywordList, isFinish, score } = state;
  const image = useMemo(() => {
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  const handleChoiceClick = (key: string) => {
    dispatch({
      type: SELECT_CHOICE,
      checkedChoiceKey: key,
    });
  };

  const handleCheckAnswer = () => {
    if (questionList[currentNumber].checkedChoiceKey === '') return;
    dispatch({
      type: CHECK_ANSWER,
    });
  };

  const handleNextQuestion = async () => {
    window.scrollTo({
      top: 0,
    });
    if (questionList.length === currentNumber + 1) {
      dispatch({ type: FINISH });
      const newKeywordList: WrongCounterModel[] = [];
      keywordList.forEach((value, key) => {
        newKeywordList.push({
          id: key,
          wrongCount: value.wrongCount,
          correctCount: value.correctCount,
        });
      });

      isLoggedIn && (await updateKeywordWrongCount(newKeywordList));

      if (Math.ceil(questionList.length * 0.8) <= score) {
        onFinish && onFinish();
      }
      return;
    }
    dispatch({ type: NEXT_QUESTION });
  };

  const handleMove = (index: number) => {
    dispatch({ type: MOVE_QUESTION, moveQuestionNumber: index });
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <QuizLayout>
      <QuizLayout.Navigation>
        <QuizNavigation
          onClickMove={handleMove}
          questionList={questionList}
          currentNumber={currentNumber}
          isFinish={isFinish}
        />
      </QuizLayout.Navigation>
      <QuizLayout.Description>
        {questionList.length === currentNumber ? (
          <Score score={score} totalScore={questionList.length} />
        ) : (
          <Description quetion={questionList[currentNumber]} image={image} />
        )}
      </QuizLayout.Description>
      <QuizLayout.Choice>
        {questionList.length === currentNumber ? (
          <UpdateScore updateScoreList={updateScoreList || []} />
        ) : (
          <ChoiceList
            quetion={questionList[currentNumber]}
            onChoiceClick={handleChoiceClick}
          />
        )}
      </QuizLayout.Choice>
      <QuizLayout.Button>
        {questionList.length === currentNumber ? (
          <QuizResultButton
            isSuccess={
              isJJH ? Math.ceil(questionList.length * 0.8) <= score : false
            }
            onNextContent={onNextContent}
          />
        ) : !questionList[currentNumber].isFinish ? (
          <ButtonGroup>
            <ButtonGroup.Item onClick={handleCheckAnswer}>
              정답 확인
            </ButtonGroup.Item>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <ButtonGroup.Item onClick={handleNextQuestion}>
              다음
            </ButtonGroup.Item>
          </ButtonGroup>
        )}
      </QuizLayout.Button>
    </QuizLayout>
  );
}

export default Quiz;
