import { m } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { MenuModel } from './Carousel';

interface CarouselItemProps {
  position: number;
  menu: MenuModel;
  handleMove: (position: number) => void;
}

export default function CarouselItem({
  position,
  menu,
  handleMove,
}: CarouselItemProps) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isActive = position === 0;
  const cardSize = isMobile ? 240 : 365;
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
        zIndex: [1, 2, 3, 2, 1][position + 2],
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <img src={imgSrc} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
      <Button $isMobile={isMobile} $isActive={isActive} onClick={to}>
        {button} {'>'}
      </Button>
    </Card>
  );
}

const Card = styled(m.div)<{ $isActive: boolean }>`
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
    $isMobile ? theme.fontSizes.large : theme.fontSizes.xxxxxl};

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
