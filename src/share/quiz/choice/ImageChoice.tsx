import styled from 'styled-components';

import CheckBox from '@/share/ui/checkbox/Checkbox';

interface AnswerCheckProps {
  $isFinish?: boolean;
  $isCorrect?: boolean;
}

interface ChoiceProps {
  handleChoiceClick: (checkboxId: string) => void;
  choiceKey: string;
  choice: string;
  isFinish: boolean;
  isCorrect: boolean;
  selectedCheckbox: string;
}

export default function ImageChoice({
  handleChoiceClick,
  isCorrect,
  choiceKey,
  choice,
  isFinish,
  selectedCheckbox,
}: ChoiceProps) {
  return (
    <ImageChoiceContainer
      onClick={() => handleChoiceClick(choiceKey)}
      $isFinish={isFinish}
      $isCorrect={isCorrect}
    >
      <ImageComment
        src={choice}
        alt="choice"
        $isFinish={isFinish}
        $isCorrect={isCorrect}
      />
      <CheckBox
        id={choiceKey}
        checked={selectedCheckbox === choiceKey}
        onChange={(e) => handleChoiceClick(e.target.id)}
        color={isFinish ? (isCorrect ? 'blue' : 'red') : 'black'}
      />
    </ImageChoiceContainer>
  );
}

const ImageChoiceContainer = styled.div<AnswerCheckProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  width: 100%;
  height: 200px;
  margin: 0;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid
    ${({ theme, $isFinish, $isCorrect }) =>
      $isFinish
        ? $isCorrect
          ? theme.colors.semiLightBlue
          : theme.colors.lightRed
        : theme.colors.lightGrey};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.keywordBg};

  color: ${({ theme }) => theme.colors.black};
`;

const ImageComment = styled.img<AnswerCheckProps>`
  width: 90%;
  height: 70%;
  border-radius: 10px;

  object-fit: contain;
`;
