import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/share/ui/button/Button';
import { RootState } from '@/store/store';

function NavigationBar() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();

  return (
    <NavigationBarContainer>
      <Navigation
        active={location.pathname.startsWith('/jeong-ju-haeng')}
        variant="textHover"
        size="large"
      >
        <LinkContainer to="/jeong-ju-haeng">정주행</LinkContainer>
      </Navigation>
      <Navigation
        active={location.pathname.startsWith('/chapter')}
        variant="textHover"
        size="large"
      >
        <LinkContainer to="/chapter">단원별</LinkContainer>
      </Navigation>
      <Navigation
        active={location.pathname.startsWith('/quiz')}
        variant="textHover"
        size="large"
      >
        <LinkContainer
          to="/quiz"
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              alert('로그인 후 이용 가능합니다.');
            }
          }}
        >
          분류별
        </LinkContainer>
      </Navigation>
      <Navigation
        active={location.pathname.startsWith('/timeline')}
        variant="textHover"
        size="large"
      >
        <LinkContainer to="/timeline">연표</LinkContainer>
      </Navigation>
      <Navigation
        active={location.pathname.includes('/option')}
        variant="textHover"
        size="large"
      >
        <LinkContainer to="/option">설정</LinkContainer>
      </Navigation>
    </NavigationBarContainer>
  );
}

export default NavigationBar;

const NavigationBarContainer = styled.nav`
  display: flex;
`;

const Navigation = styled(Button)`
  margin: 0 10px;
`;
const LinkContainer = styled(Link)`
  display: block;

  width: 100%;
  height: 100%;
`;
