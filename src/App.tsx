import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import { jjhApi } from './store/api/jjhApi';
import { RootState } from './store/store';

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(jjhApi.util.invalidateTags(['jjhUpdate']));
    } else {
      isMounted.current = true;
    }
  }, [isLoggedIn, dispatch]);

  return (
    <main>
      <StyleSheetManager enableVendorPrefixes>
        <Outlet />
      </StyleSheetManager>
    </main>
  );
}
