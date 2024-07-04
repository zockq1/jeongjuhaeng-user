import { Outlet } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import usePrefetchSideMenu from './share/hook/usePrefetchSideMenu';

export default function App() {
  usePrefetchSideMenu();

  return (
    <main>
      <StyleSheetManager enableVendorPrefixes>
        <Outlet />
      </StyleSheetManager>
    </main>
  );
}
