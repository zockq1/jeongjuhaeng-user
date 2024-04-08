import styled from 'styled-components';

import { QuestionScoreModel } from '@/types/questionTypes';

interface UpdateScoreUIProps {
  updateScoreList: QuestionScoreModel[];
}

export default function UpdateScore({ updateScoreList }: UpdateScoreUIProps) {
  return (
    <WrongQuestionListContainer>
      <WrongQuestionList>
        <thead>
          <tr>
            <th>문제 분류</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {updateScoreList.map((item, index) => {
            const prev = item.prevScore.toFixed(1);
            const plus = (item.nextScore - item.prevScore).toFixed(1);
            const next = item.nextScore.toFixed(1);
            return (
              <tr key={index}>
                <td>{item.questionCategoryName}</td>
                <td>
                  {prev} +{' '}
                  <span className={plus === '0' ? 'red' : 'blue'}>{plus}</span>{' '}
                  {' => '} {next}
                </td>
              </tr>
            );
          })}
        </tbody>
      </WrongQuestionList>
    </WrongQuestionListContainer>
  );
}

const WrongQuestionListContainer = styled.div`
  overflow: hidden;

  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};
`;

const WrongQuestionList = styled.table`
  width: 100%;

  tr {
    width: 100%;
  }

  th {
    padding: ${({ theme }) => theme.padding.small};

    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }

  td {
    padding: ${({ theme }) => theme.padding.small};
    border-top: ${({ theme }) => theme.border.default};

    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }

  th,
  td {
    width: 50%;
    border-left: ${({ theme }) => theme.border.default};

    text-align: center;
  }

  th:first-child,
  td:first-child {
    border-left: none;
  }

  td:last-child {
    border-bottom: none;
  }

  .blue {
    color: ${({ theme }) => theme.colors.blue};
  }

  .red {
    color: ${({ theme }) => theme.colors.red};
  }
`;
