import { useState } from 'react';
import styled from 'styled-components';

import CarouselItem from './CarouselItem';

export interface MenuModel {
  id: string;
  title: string;
  description: string;
  button: string;
  imgSrc: string;
  to: () => void;
}

interface CarouselProps {
  cardList: MenuModel[];
}

export default function Carousel({ cardList }: CarouselProps) {
  const [menuList, setMenuList] = useState(cardList);

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
          <CarouselItem
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
