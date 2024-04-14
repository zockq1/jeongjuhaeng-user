import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../ui/icon/Icon';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <BackButtonContainer onClick={() => navigate(-1)}>
      <Icon icon="angleLeft" size={18} />
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
