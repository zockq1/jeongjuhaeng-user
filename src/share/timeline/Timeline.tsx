import { ReactNode } from 'react';
import styled from 'styled-components';

import TimelineButton from './TimelineButton';
import TimelineItem from './TimelineItem';

interface TimelineListProps {
  children?: ReactNode;
}

export default function Timeline({ children }: TimelineListProps) {
  return (
    <TimelineListContainer>
      <Line />
      {children}
    </TimelineListContainer>
  );
}

Timeline.Item = TimelineItem;
Timeline.Button = TimelineButton;

const Line = styled.li`
  position: absolute;
  left: 14px;
  z-index: 0;

  width: 6px;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.textBlue};
`;

const TimelineListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;

  margin-bottom: 30px;
`;
