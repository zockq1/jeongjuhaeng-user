import { domAnimation, LazyMotion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import usePrefetchSideMenu from './share/hook/usePrefetchSideMenu';
import useRefresh from './share/hook/useRefresh';
import useRouteChangeTracker from './share/hook/useRouteRangeTracker';
import useScrollTop from './share/hook/useScrollTop';

export default function App() {
  usePrefetchSideMenu();
  useScrollTop();
  useRefresh();
  useRouteChangeTracker();

  return (
    <main>
      <HelmetProvider>
        <LazyMotion features={domAnimation}>
          <StyleSheetManager enableVendorPrefixes>
            <Outlet />
          </StyleSheetManager>
        </LazyMotion>
      </HelmetProvider>
    </main>
  );
}
