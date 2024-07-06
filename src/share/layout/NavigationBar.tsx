import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/share/ui/button/Button';
import { RootState } from '@/store/store';

const NavigationBarContainer = styled.nav`
  display: flex;
`;

const Navigation = styled(Button)`
  margin: 0 10px;
`;

function NavigationBar() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavigationBarContainer>
      <Navigation
        onClick={() => navigate('/jeong-ju-haeng')}
        active={location.pathname.includes('/jeong-ju-haeng')}
        variant="textHover"
        size="large"
      >
        정주행
      </Navigation>
      <Navigation
        onClick={() => navigate('/learning')}
        active={location.pathname.includes('/learning')}
        variant="textHover"
        size="large"
      >
        단원별
      </Navigation>
      <Navigation
        onClick={() =>
          isLoggedIn ? navigate('/quiz') : alert('로그인 후 이용 가능합니다.')
        }
        active={location.pathname.startsWith('/quiz')}
        variant="textHover"
        size="large"
      >
        분류별
      </Navigation>
      <Navigation
        onClick={() => navigate('/timeline-list')}
        active={location.pathname === '/timeline'}
        variant="textHover"
        size="large"
      >
        연표
      </Navigation>
      <Navigation
        onClick={() => navigate('/option')}
        active={location.pathname.includes('/option')}
        variant="textHover"
        size="large"
      >
        설정
      </Navigation>
    </NavigationBarContainer>
  );
}

export default NavigationBar;
