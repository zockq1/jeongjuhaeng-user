import { ReactElement, ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface PopoverProps {
  content: ReactNode;
  children: ReactElement;
  trigger?: 'click' | 'hover';
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Popover({
  content,
  children,
  trigger = 'click',
  placement = 'bottom',
}: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  const handleTriggerHover = () => {
    if (trigger === 'hover') {
      setIsVisible(!isVisible);
    }
  };

  const handleKeepFocus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  return (
    <PopoverContainer
      onMouseEnter={handleTriggerHover}
      onMouseLeave={handleTriggerHover}
    >
      <Trigger
        tabIndex={0}
        onClick={handleTriggerClick}
        onBlur={handleBlur}
        ref={popoverRef}
      >
        {children}
      </Trigger>
      {isVisible && (
        <Content $placement={placement} onMouseDown={handleKeepFocus}>
          {content}
        </Content>
      )}
    </PopoverContainer>
  );
}

const PopoverContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const Trigger = styled.div`
  cursor: pointer;
`;

const Content = styled.div<{ $placement: PopoverProps['placement'] }>`
  position: absolute;
  z-index: 99999;

  width: max-content;
  padding: 8px;
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: #fff;

  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.base};

  ${({ $placement }) => {
    switch ($placement) {
      case 'top':
        return css`
          bottom: 100%;
          left: 50%;

          transform: translateX(-50%);
        `;
      case 'bottom':
        return css`
          top: 100%;
          left: 50%;

          transform: translateX(-50%);
        `;
      case 'left':
        return css`
          top: 50%;
          right: 100%;

          transform: translateY(-50%);
        `;
      case 'right':
        return css`
          top: 50%;
          left: 100%;

          transform: translateY(-50%);
        `;
    }
  }}
`;
