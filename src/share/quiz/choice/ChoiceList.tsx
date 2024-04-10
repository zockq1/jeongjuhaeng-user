import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { QuestionModel } from '@/types/questionTypes';

import Comment from '../Comment';
import ImageChoice from './ImageChoice';
import StringChoice from './StringChoice';

interface QuestionProps {
  quetion: QuestionModel;
  onChoiceClick: (choiceId: string) => void;
}

export default function ChoiceList({ quetion, onChoiceClick }: QuestionProps) {
  const {
    choiceList,
    answer,
    isFinish,
    checkedChoiceKey,
    choiceType,
    questionType,
  } = quetion;
  const theme = useContext(ThemeContext);

  return (
    <>
      {choiceType === 'String' || questionType === 'KtoT' ? (
        <ul>
          {choiceList.map((item, index) => (
            <StringChoiceContainer key={String(index) + item.key}>
              <StringChoice
                handleChoiceClick={onChoiceClick}
                choiceKey={String(index + 1) + item.key}
                isCorrect={answer === item.key}
                choice={item.choice}
                isFinish={isFinish}
                selectedCheckbox={checkedChoiceKey}
                index={index}
              />
              {item.commentList.length > 0 && (
                <Comment
                  isCommentOpen={isFinish}
                  commentList={item.commentList}
                  color={
                    answer === item.key ? theme?.colors.blue : theme?.colors.red
                  }
                />
              )}
            </StringChoiceContainer>
          ))}
        </ul>
      ) : (
        <ImageChoiceList>
          {choiceList.map((item, index) => (
            <ImageChoiceContainer key={String(index) + item.key}>
              <ImageChoice
                handleChoiceClick={onChoiceClick}
                choiceKey={String(index + 1) + item.key}
                isCorrect={answer === item.key}
                choice={item.choice}
                isFinish={isFinish}
                selectedCheckbox={checkedChoiceKey}
              />
              {item.commentList.length > 0 && (
                <Comment
                  isCommentOpen={isFinish}
                  commentList={item.commentList}
                  color={
                    answer === item.key ? theme?.colors.blue : theme?.colors.red
                  }
                />
              )}
            </ImageChoiceContainer>
          ))}
        </ImageChoiceList>
      )}
    </>
  );
}

const ImageChoiceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageChoiceContainer = styled.li`
  width: calc((100% - 20px) / 2);
  margin-bottom: 10px;
`;

const StringChoiceContainer = styled.li`
  margin-bottom: 10px;
`;
