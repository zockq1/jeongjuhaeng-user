import { Color } from '@/types/commonTypes';
import { ContentState } from '@/types/jjhTypes';

import { IconType } from '../ui/icon/Icon';

export default function getColorAndIcon(state: ContentState): {
  color: Color;
  icon: IconType;
} {
  switch (state) {
    case 'Locked':
      return { color: 'red', icon: 'lock' };
    case 'InProgress':
      return { color: 'blue', icon: 'run' };
    case 'Complete':
      return { color: 'green', icon: 'check' };
    default:
      return { color: 'black', icon: '' }; // 기본값 설정
  }
}
