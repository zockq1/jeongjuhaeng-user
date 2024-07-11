import PrevNextButton from '@/share/ui/button/PrevNextButton';
import getColorAndIcon from '@/share/util/getColorAndIcon';

import { JJHModel } from '../_hook/useGetJJHCategory';

interface JJHPrevNextProps {
  prev?: JJHModel;
  next?: JJHModel;
}

export default function JJHPrevNext({ prev, next }: JJHPrevNextProps) {
  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title,
              category: prev.category,
              to: prev.to,
              lock: prev.state === 'Locked',
              color: getColorAndIcon(prev.state).color,
            }
          : undefined
      }
      next={
        next
          ? {
              title: next.title,
              category: next.category,
              to: next.to,
              lock: next.state === 'Locked',
              color: getColorAndIcon(next.state).color,
            }
          : undefined
      }
      toMenu="/jeong-ju-haeng"
    />
  );
}
