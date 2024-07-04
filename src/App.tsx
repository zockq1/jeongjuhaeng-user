import { Outlet } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import useCheckRefresh from './share/hook/useCheckRefresh';
import usePrefetchSideMenu from './share/hook/usePrefetchSideMenu';

export default function App() {
  usePrefetchSideMenu();
  useCheckRefresh();

  return (
    <main>
      <StyleSheetManager enableVendorPrefixes>
        <Outlet />
      </StyleSheetManager>
    </main>
  );
}
