import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '@/share/ui/icon/Icon';
import { RootState } from '@/store/store';

export default function SlideMenu() {
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
        <MenuItem to="/jeong-ju-haeng">
          <Icon icon="run" size={14} />
          &nbsp; 정주행
        </MenuItem>
        <MenuItem to="/chapter">
          <Icon icon="description" size={14} />
          &nbsp; 단원별 정보
        </MenuItem>
        <MenuItem
          to="/quiz"
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              alert('로그인 후 이용 가능합니다.');
            }
          }}
        >
          <Icon icon="question" size={14} />
          &nbsp; 분류별 정보
        </MenuItem>
        <MenuItem to="/timeline">
          <Icon icon="timeline" size={14} />
          &nbsp; 연표
        </MenuItem>
        <MenuItem to="/option">
          <Icon icon="setting" size={14} />
          &nbsp; 설정
        </MenuItem>
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

const MenuItem = styled(Link)`
  display: flex;

  margin: 10px;

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
