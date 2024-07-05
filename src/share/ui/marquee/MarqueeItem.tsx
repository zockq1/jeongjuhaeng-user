import styled from 'styled-components';

export default function MarqueeItem({ name }: { name: string }) {
  return <ItemContainer>{name}</ItemContainer>;
}

const ItemContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  white-space: nowrap;

  text-decoration: none;

  text-transform: uppercase;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;
