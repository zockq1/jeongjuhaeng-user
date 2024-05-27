import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

type Color = 'red' | 'black';

interface TimelineButtonProps {
  onClick: () => void;
  children: ReactNode;
  color: Color;
}

export default function TimelineButton({
  onClick,
  children,
  color,
}: TimelineButtonProps) {
  return (
    <TimelineItemContainer>
      <InnerCircle />
      <Button onClick={onClick} $color={color}>
        {children}
      </Button>
    </TimelineItemContainer>
  );
}

const slideDownFadeIn = keyframes`
  from {
    max-height: 0;
  }

  to {
    max-height: 100px;
  }
`;

const TimelineItemContainer = styled.li`
  display: grid;
  align-items: center;

  margin: 10px 0;

  animation: ${slideDownFadeIn} 0.5s ease-out forwards;

  grid-template-columns: 39px 1fr;
`;

const InnerCircle = styled.div`
  visibility: hidden;
  position: relative;
  z-index: 9;

  width: 14px;
  height: 14px;
  margin: 10px;
  border: 4px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.bgBlue};
`;

const Button = styled.button<{ $color: Color }>`
  height: 40px;
  padding: ${({ theme }) => theme.padding.small};
  border: 1px solid
    ${({ theme, $color }) =>
      $color === 'red' ? theme.colors.red : theme.colors.lightGrey};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.keywordBg};

  color: ${({ theme, $color }) =>
    $color === 'red' ? theme.colors.red : theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;
