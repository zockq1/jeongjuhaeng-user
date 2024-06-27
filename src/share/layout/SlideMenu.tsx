import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '@/share/ui/icon/Icon';
import { RootState } from '@/store/store';

export default function SlideMenu() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <IconButton onClick={toggleMenu} aria-label="Slide menu button">
        <Icon icon="menu" size={25} />
      </IconButton>
      <DarkOverlay $isVisible={isMenuOpen} onClick={closeMenu} />
      <SlidingMenu className={isMenuOpen ? '' : 'closed'}>
        <MenuItem onClick={() => navigate('/jeong-ju-haeng')}>
          <Icon icon="run" size={14} />
          &nbsp; 정주행
        </MenuItem>
        <MenuItem onClick={() => navigate('/learning')}>
          <Icon icon="description" size={14} />
          &nbsp; 단원별 정보
        </MenuItem>
        <MenuItem
          onClick={() =>
            isLoggedIn ? navigate('/quiz') : alert('로그인 후 이용 가능합니다.')
          }
        >
          <Icon icon="question" size={14} />
          &nbsp; 분류별 정보
        </MenuItem>
        <MenuItem onClick={() => navigate('/timeline-list')}>
          <Icon icon="TIMELINE_STUDY" size={14} />
          &nbsp; 연표
        </MenuItem>
        <MenuItem onClick={() => navigate('/option')}>
          <Icon icon="setting" size={14} />
          &nbsp; 설정
        </MenuItem>
        {/* <MenuItem to="/question/quiz-list">
          <Icon icon="question" size={14} />
          &nbsp; 퀴즈
        </MenuItem>
        <MenuItem to="/question/timeline-list">
          <Icon icon="questionSquare" size={14} />
          &nbsp; 연표 문제
        </MenuItem>
        <MenuItem to="/question/mock-exam-list">
          <Icon icon="pen" size={14} />
          &nbsp; 기출 문제
        </MenuItem>
        <MenuItem to="/my-info/wrong-notes">
          <Icon icon="fail" size={14} />
          &nbsp; 오답 노트
        </MenuItem>
        <MenuItem to="/my-info/bookmark">
          <Icon icon="bookmarkOff" size={14} />
          &nbsp; 북마크
        </MenuItem>
        <MenuItem to="/my-info/search">
          <Icon icon="search" size={14} />
          &nbsp; 검색
        </MenuItem>
        <MenuItem to="/option">
          <Icon icon="setting" size={14} />
          &nbsp; 설정
        </MenuItem> */}
      </SlidingMenu>
    </>
  );
}

const SlidingMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 55px;
  left: 0;
  z-index: 9999;

  width: 250px;
  height: 100%;
  padding-top: 10px;

  background-color: #fff;

  transform: translateX(0);
  transition: transform 0.3s ease-in-out;

  &.closed {
    transform: translateX(-100%);
  }
`;

const DarkOverlay = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  position: fixed;
  top: 55px;
  left: 0;
  z-index: 9998;

  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 50%);
`;

const MenuItem = styled.button`
  display: flex;

  margin: 10px;

  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
