import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import { jjhApi, useLazyGetTotalProgressQuery } from './store/api/jjhApi';
import { RootState } from './store/store';

export default function App() {
  const [triger] = useLazyGetTotalProgressQuery();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!isMounted.current && isLoggedIn) {
      triger().then();
      dispatch(jjhApi.util.invalidateTags(['jjhUpdate']));
    } else {
      isMounted.current = true;
    }
  }, [isLoggedIn, dispatch, triger]);

  return (
    <main>
      <StyleSheetManager enableVendorPrefixes>
        <Outlet />
      </StyleSheetManager>
    </main>
  );
}
