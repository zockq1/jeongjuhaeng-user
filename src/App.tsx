import { Outlet } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import usePrefetchSideMenu from './share/hook/usePrefetchSideMenu';
import useScrollTop from './share/hook/useScrollTop';

export default function App() {
  usePrefetchSideMenu();
  useScrollTop();

  return (
    <main>
      <StyleSheetManager enableVendorPrefixes>
        <Outlet />
      </StyleSheetManager>
    </main>
  );
}
