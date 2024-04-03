import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Logo({ size }: LogoProps) {
  return (
    <LogoContainer to="/" size={size}>
      정주행 한국사
    </LogoContainer>
  );
}

const LogoContainer = styled(Link)<LogoProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: max-content;

  color: ${({ theme }) => theme.colors.textBlue};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ size }) => `${size}px`};

  font-family:
    Giants-Regular,
    -apple-system,
    BlinkMacSystemFont,
    'Malgun Gothic',
    '맑은 고딕',
    helvetica,
    'Apple SD Gothic Neo',
    sans-serif;
`;

interface LogoProps {
  size: number;
}
