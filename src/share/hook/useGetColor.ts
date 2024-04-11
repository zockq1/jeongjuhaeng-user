import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

type Color = 'red' | 'black' | 'blue' | 'grey';

interface useGetColorProps {
  color: Color;
}
export default function useGetColor({ color }: useGetColorProps) {
  const theme = useContext(ThemeContext);

  const colorMap = {
    red: theme?.colors.red,
    black: theme?.colors.textBlue,
    blue: theme?.colors.blue,
    grey: theme?.colors.grey,
  };

  return colorMap[color] || theme?.colors.textBlue;
}
