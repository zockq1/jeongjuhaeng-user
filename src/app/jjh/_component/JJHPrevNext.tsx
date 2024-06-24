import { useNavigate } from 'react-router-dom';

import PrevNextButton from '@/share/ui/button/PrevNextButton';
import getColorAndIcon from '@/share/util/getColorAndIcon';

import useGetJJHCategory from '../_hook/useGetJJHCategory';

export default function JJHPrevNext() {
  const { nextJJH, prevJJH } = useGetJJHCategory();
  const navigate = useNavigate();

  return (
    <PrevNextButton
      prev={
        prevJJH
          ? {
              title: prevJJH.title,
              onClick: prevJJH.onClick,
              lock: prevJJH.state === 'Locked',
              color: getColorAndIcon(prevJJH.state).color,
            }
          : undefined
      }
      next={
        nextJJH
          ? {
              title: nextJJH.title,
              onClick: nextJJH.onClick,
              lock: nextJJH.state === 'Locked',
              color: getColorAndIcon(nextJJH.state).color,
            }
          : undefined
      }
      onClickMenu={() => navigate('/jeong-ju-haeng')}
    />
  );
}
