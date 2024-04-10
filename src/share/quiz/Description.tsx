import styled from 'styled-components';

import { QuestionModel } from '@/types/questionTypes';

import Comment from './Comment';

interface QuestionProps {
  quetion: QuestionModel;
  image: string;
}

export default function Description({ quetion, image }: QuestionProps) {
  const {
    descriptionList,
    isFinish,
    descriptionCommentList,
    choiceType,
    questionType,
  } = quetion;

  return (
    <div>
      <DescriptionContainer>
        {questionType === 'Exam' ? (
          <img
            style={{ width: '100%', height: 'auto' }}
            src={descriptionList[0]}
            alt=""
          />
        ) : questionType === 'KtoT' && choiceType === 'Image' ? (
          <>
            <Image src={image} />
            {descriptionList.map((item) => {
              return (
                <DescriptionItem key={item}>
                  <img
                    style={{ width: '50%', height: '100%' }}
                    src={item}
                    alt=""
                  />
                </DescriptionItem>
              );
            })}
          </>
        ) : (
          <>
            <Image src={image} />
            {descriptionList.map((item) => {
              return <DescriptionItem key={item}>{item}</DescriptionItem>;
            })}
          </>
        )}
      </DescriptionContainer>
      {descriptionCommentList.length > 0 &&
        (choiceType === 'String' || questionType === 'KtoT') && (
          <Comment
            isCommentOpen={isFinish}
            commentList={descriptionCommentList}
          />
        )}
    </div>
  );
}

const DescriptionContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  position: relative;

  min-height: 240px;
  padding: ${({ theme }) => theme.padding.small};
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.keywordBg};
`;

const Image = styled.img`
  position: absolute;

  width: 90%;
  height: 90%;

  object-fit: contain;
  opacity: 0.05;
`;

const DescriptionItem = styled.div`
  z-index: 1;

  width: fit-content;
  margin: 10px;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: ${({ theme }) => theme.borderRadius.small};

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  text-align: center;

  word-break: keep-all;
`;
