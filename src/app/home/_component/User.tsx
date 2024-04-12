import { useSelector } from 'react-redux';
import styled from 'styled-components';

import user from '@/assets/images/user.svg';
import { RootState } from '@/store/store';

const UserContainer = styled.div`
  display: grid;
  overflow: hidden;
  position: relative;

  margin: 10px 5px;
  padding: ${({ theme }) => theme.padding.base};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  grid-template-columns: 100px 20px 1fr 20px;
  place-items: center;
`;

const UserImage = styled.img`
  height: 70px;
`;

const UserName = styled.span`
  width: 100%;

  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-align: start;
`;

export default function User() {
  const id = useSelector((state: RootState) => state.auth.id);
  return (
    <UserContainer>
      <UserImage src={user} />
      ID:
      <UserName>{id}</UserName>
      {'>'}
    </UserContainer>
  );
}
