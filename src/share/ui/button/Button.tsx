import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type Variant = 'textHover' | 'text';

type Size = 'small' | 'medium' | 'large';

const variantStyles = {
  textHover: css`
    color: ${({ theme }) => theme.colors.grey};
    font-weight: ${({ theme }) => theme.fontWeight.light};

    &:hover {
      color: ${({ theme }) => theme.colors.textBlue};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  `,
  text: css`
    color: ${({ theme }) => theme.colors.textBlue};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  `,
};

const sizeStyles = {
  small: css`
    font-size: ${({ theme }) => theme.fontSizes.small};
  `,
  medium: css`
    font-size: ${({ theme }) => theme.fontSizes.base};
  `,
  large: css`
    font-size: ${({ theme }) => theme.fontSizes.large};
  `,
};

interface StyledButtonProps {
  $variant: Variant;
  $size: Size;
  $isActive: boolean;
}

const ButtonContainer = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;

  width: max-content;
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $isActive }) =>
    $isActive &&
    css`
      color: ${({ theme }) => theme.colors.textBlue};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    `}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  active?: boolean;
}

function Button({
  variant = 'text',
  size = 'medium',
  active = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonContainer
      $variant={variant}
      $size={size}
      $isActive={active}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
}

export default Button;
