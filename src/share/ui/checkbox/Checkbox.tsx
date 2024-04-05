import React from 'react';
import styled, { keyframes } from 'styled-components';

type Color = 'red' | 'black' | 'blue';

interface CheckBoxProps {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  color?: Color;
}

export default function CheckBox({
  id,
  checked,
  onChange,
  color = 'black',
}: CheckBoxProps) {
  return (
    <CheckboxContainer>
      <CheckboxInput
        id={id}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <StyledCheckbox htmlFor={id} color={color}>
        <div className="tick"></div>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}

const popAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  33% {
    transform: scale(0.9);
  }

  66% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const CheckboxContainer = styled.div`
  position: relative;
`;

const CheckboxInput = styled.input`
  position: absolute;
  left: -1000px;

  opacity: 0;
`;

interface StyledCheckboxProps {
  color: Color;
}

const StyledCheckbox = styled.label<StyledCheckboxProps>`
  --checkbox-size: 20px;
  --tick-color: ${({ color, theme }) => {
    switch (color) {
      case 'red':
        return theme.colors.red;
      case 'black':
        return theme.colors.textBlue;
      case 'blue':
        return theme.colors.blue;
    }
  }};
  --border-color: ${({ color, theme }) => {
    switch (color) {
      case 'red':
        return theme.colors.lightRed;
      case 'black':
        return theme.colors.textBlue;
      case 'blue':
        return theme.colors.semiLightBlue;
    }
  }};

  display: block;
  flex-shrink: 0;

  width: var(--checkbox-size);
  height: var(--checkbox-size);
  margin: 5px 0;
  border: calc(var(--checkbox-size) * 0.075) solid var(--border-color);
  border-radius: 12.5%;

  background-color: ${({ theme }) => theme.colors.white};

  & .tick {
    position: relative;
    top: calc(var(--checkbox-size) * -0.25);
    right: calc(var(--checkbox-size) * -0.5);

    width: calc(var(--checkbox-size) * 0.25);
    height: calc(var(--checkbox-size) * 0.75);
    border-right: calc(var(--checkbox-size) * 0.25) solid var(--tick-color);
    border-bottom: calc(var(--checkbox-size) * 0.25) solid var(--tick-color);

    opacity: 0;
    transform: rotate(45deg) scale(0);
    transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.5);

    &::before {
      position: absolute;
      bottom: calc(var(--checkbox-size) * -0.25);
      left: calc(var(--checkbox-size) * -0.125);

      border: calc(var(--checkbox-size) * 0.125) solid var(--tick-color);
      border-radius: 50%;

      content: '';
    }

    &::after {
      position: absolute;
      top: calc(var(--checkbox-size) * -0.125);
      right: calc(var(--checkbox-size) * -0.25);

      border: calc(var(--checkbox-size) * 0.125) solid var(--tick-color);
      border-radius: 50%;

      content: '';
    }
  }

  ${CheckboxInput}:checked + & .tick {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }

  ${CheckboxInput}:checked + & {
    animation: ${popAnimation} 400ms linear;
  }
`;
