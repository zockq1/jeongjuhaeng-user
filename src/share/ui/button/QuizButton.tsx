import { ButtonHTMLAttributes } from 'react';

import Button from '@/share/ui/button/Button';
import Icon from '@/share/ui/icon/Icon';

export default function QuizButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <Button {...props}>
      <Icon icon="exam" size={14} />
      &nbsp; <span style={{ marginTop: '3px' }}>문제 풀이</span>
    </Button>
  );
}
