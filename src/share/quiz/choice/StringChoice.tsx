import styled from 'styled-components';

import CheckBox from '@/share/ui/checkbox/Checkbox';

interface ChoiceProps {
  handleChoiceClick: (checkboxId: string) => void;
  handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
  choiceKey: string;
  choice: string;
  isCorrect: boolean;
  isFinish: boolean;
  selectedCheckbox: string;
}

export default function StringChoice({
  handleChoiceClick,
  choiceKey,
  choice,
  isCorrect,
  isFinish,
  selectedCheckbox,
  index,
}: ChoiceProps) {
  return (
    <>
      <StringChoiceContainer
        onClick={() => handleChoiceClick(choiceKey)}
        $isFinish={isFinish}
        $isCorrect={isCorrect}
      >
        <StringComment $isFinish={isFinish} $isCorrect={isCorrect}>
          {`${index + 1}. ${choice}`}
        </StringComment>
        <CheckBox
          id={choiceKey}
          checked={selectedCheckbox === choiceKey}
          onChange={(e) => handleChoiceClick(e.target.id)}
          color={isFinish ? (isCorrect ? 'blue' : 'red') : 'black'}
        />
      </StringChoiceContainer>
    </>
  );
}

interface AnswerCheckProps {
  $isFinish?: boolean;
  $isCorrect?: boolean;
}

const StringChoiceContainer = styled.div<AnswerCheckProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  height: max-content;
  padding: 5px 8px;
  border: 1px solid
    ${({ theme, $isFinish, $isCorrect }) =>
      $isFinish
        ? $isCorrect
          ? theme.colors.blue
          : theme.colors.red
        : theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.textBlue};
`;

export const StringComment = styled.span<AnswerCheckProps>`
  color: ${({ theme, $isCorrect, $isFinish }) =>
    $isFinish
      ? $isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 120%;

  word-break: keep-all;
`;
