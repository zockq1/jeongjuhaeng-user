import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Books from '@/assets/images/books.svg';
import Timeline from '@/assets/images/date.svg';
import Run from '@/assets/images/run.svg';
interface MenuModel {
  id: string;
  title: string;
  description: string;
  button: string;
  imgSrc: string;
  to: string;
}

export default function CardList() {
  const cardList = useRef<MenuModel[]>([
    {
      id: '1',
      imgSrc: Books,
      title: '단원 학습',
      description: '단원별로 정리된 한국사 정보',
      button: '자료 보러가기',
      to: '/learning',
    },
    {
      id: '2',
      imgSrc: Run,
      title: '정주행',
      description: '순서대로 한능검 시험 공부',
      button: '정주행 하러가기',
      to: '/jeong-ju-haeng',
    },
    {
      id: '3',
      imgSrc: Timeline,
      title: '연표 학습',
      description: '연도별로 정리된 한국사 정보',
      button: '연표 보러가기',
      to: 'timeline-list',
    },
  ]);
  const [menuList, setMenuList] = useState(cardList.current);

  const handleMove = (position: number) => {
    const copy = [...menuList];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();

        if (!firstEl) return;

        copy.push({ ...firstEl });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();

        if (!lastEl) return;

        copy.unshift({ ...lastEl });
      }
    }

    setMenuList(copy);
  };

  return (
    <CardListContainer>
      {menuList.map((menu, index) => {
        let position = 0;

        if (menuList.length % 2) {
          position = index - (menuList.length - 1) / 2;
        } else {
          position = index - menuList.length / 2;
        }

        return (
          <MenuCard
            key={menu.id}
            menu={menu}
            handleMove={handleMove}
            position={position}
          />
        );
      })}
    </CardListContainer>
  );
}

interface TestimonialProps {
  position: number;
  menu: MenuModel;
  handleMove: (position: number) => void;
}

function MenuCard({ position, menu, handleMove }: TestimonialProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isActive = position === 0;
  const cardSize = useMemo(() => {
    return isMobile ? 250 : 365;
  }, [isMobile]);
  const { imgSrc, title, to, button, description } = menu;

  return (
    <Card
      initial={false}
      $isActive={isActive}
      onClick={() => handleMove(position)}
      animate={{
        width: cardSize,
        height: cardSize * 1.2,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-40% + ${isActive ? -65 : position % 2 ? 15 : -15}px)`,
        rotate: isActive ? 0 : position % 2 ? 3 : -3,
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <img src={imgSrc} />
      <h1>{title}</h1>
      <p>{description}</p>
      <Button
        $isMobile={isMobile}
        $isActive={isActive}
        onClick={() => navigate(to)}
      >
        {button} {'>'}
      </Button>
    </Card>
  );
}

const CardListContainer = styled.div`
  overflow: hidden;
  position: relative;

  width: 100%;
  height: 600px;

  transition: 1s ease;

  @media (width <= 640px) {
    height: 500px;
  }
`;

const Card = styled(motion.div)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${({ $isActive }) => ($isActive ? 10 : 0)};

  padding: 20px;
  border: 4px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.textBlue : theme.colors.lightGrey};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textBlue : theme.colors.grey};

  cursor: pointer;
  font-family: Giants-Regular;

  & > h1 {
    margin: 20px 0;

    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }

  & > p {
    margin-bottom: 10px;

    font-weight: ${({ theme }) => theme.fontWeight.light};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 120%;
    text-align: center;

    word-break: keep-all;
  }

  & > img {
    height: 30%;
    max-width: 68%;
    margin-top: 20px;
  }
`;

const Button = styled.button<{ $isMobile: boolean; $isActive: boolean }>`
  margin: 20px 0;
  padding: ${({ theme }) => theme.padding.small};
  border: 3px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.textBlue : theme.colors.lightGrey};
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.white};

  color: inherit;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme, $isMobile }) =>
    $isMobile ? theme.fontSizes.xl : theme.fontSizes.xxxxxl};

  font-family: Giants-Regular;

  text-transform: uppercase;
  transition: all 0.3s;

  &:hover {
    border-radius: 10px;
    box-shadow: 4px 4px 0
      ${({ theme, $isActive }) =>
        $isActive ? theme.colors.textBlue : theme.colors.grey};

    transform: translate(-4px, -4px);
  }

  &:active {
    box-shadow: none;
    transform: translate(0, 0);
  }
`;
