import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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

  return (
    <NavigationBarContainer>
      <Navigation
        active={location.pathname.includes('/jeong-ju-haeng')}
        variant="textHover"
        size="large"
      >
        <Link to="/jeong-ju-haeng">정주행</Link>
      </Navigation>
      <Navigation
        active={location.pathname.includes('/learning')}
        variant="textHover"
        size="large"
      >
        <Link to="/learning">단원별</Link>
      </Navigation>
      <Navigation
        onClick={(e) => {
          if (!isLoggedIn) {
            e.preventDefault();
            alert('로그인 후 이용 가능합니다.');
          }
        }}
        active={location.pathname.startsWith('/quiz')}
        variant="textHover"
        size="large"
      >
        <Link to="/quiz">분류별</Link>
      </Navigation>
      <Navigation
        active={location.pathname === '/timeline'}
        variant="textHover"
        size="large"
      >
        <Link to="/timeline-list">연표</Link>
      </Navigation>
      <Navigation
        active={location.pathname.includes('/option')}
        variant="textHover"
        size="large"
      >
        <Link to="/option">설정</Link>
      </Navigation>
    </NavigationBarContainer>
  );
}

export default NavigationBar;
