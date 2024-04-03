import { Expanded, Mobile } from '@/share/layout/Responsive';

import ExpendedHeader from './ExpendedHeader';
import MobileHeader from './MobileHeader';

export default function Header() {
  return (
    <>
      <Expanded>
        <ExpendedHeader />
      </Expanded>
      <Mobile>
        <MobileHeader />
      </Mobile>
    </>
  );
}
