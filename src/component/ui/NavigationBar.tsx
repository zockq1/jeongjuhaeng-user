import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/share/button/Button';

const NavigationBarContainer = styled.nav`
  display: flex;
`;

const Navigation = styled(Button)`
  margin: 0 10px;
`;

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavigationBarContainer>
      <Navigation
        onClick={() => navigate('/jeong-ju-haeng')}
        active={location.pathname.includes('/jeong-ju-haeng')}
      >
        정주행
      </Navigation>
      <Navigation
        onClick={() => navigate('/learning')}
        active={location.pathname.includes('/learning')}
      >
        자료
      </Navigation>
      <Navigation
        onClick={() => navigate('/timeline-list')}
        active={location.pathname === '/timeline'}
      >
        연표
      </Navigation>
      <Navigation
        onClick={() => navigate('/question/quiz-list')}
        active={location.pathname.includes('/question/quiz')}
      >
        퀴즈
      </Navigation>
      <Navigation
        onClick={() => navigate('/question/timeline-list')}
        active={location.pathname.includes('/question/timeline')}
      >
        연표 문제
      </Navigation>
      <Navigation
        onClick={() => navigate('/question/mock-exam-list')}
        active={location.pathname.includes('/question/mock-exam')}
      >
        기출
      </Navigation>
      <Navigation
        onClick={() => navigate('/my-info/wrong-notes')}
        active={location.pathname.includes('wrong-notes')}
      >
        오답노트
      </Navigation>
      <Navigation
        onClick={() => navigate('/my-info/bookmark')}
        active={location.pathname.includes('bookmark')}
      >
        북마크
      </Navigation>
    </NavigationBarContainer>
  );
}

export default NavigationBar;
