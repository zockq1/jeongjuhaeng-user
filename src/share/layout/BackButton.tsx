import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import Icon from '../ui/icon/Icon';

export default function BackButton() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <BackButtonContainer onClick={() => navigate(-1)}>
      <Icon icon="angleLeft" size={18} color={theme?.colors.textBlue} />
    </BackButtonContainer>
  );
}

const BackButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 28px;
  margin-right: 10px;

  font-size: 32px;
`;
