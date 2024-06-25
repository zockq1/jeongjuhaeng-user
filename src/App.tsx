import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import { chapterApi } from './store/api/chapterApi';
import { jjhApi } from './store/api/jjhApi';
import { questionApi } from './store/api/questionApi';
import { timelineApi } from './store/api/timelineApi';
import { topicApi } from './store/api/topicApi';
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
      dispatch(topicApi.util.resetApiState());
      dispatch(chapterApi.util.resetApiState());
      dispatch(timelineApi.util.resetApiState());
      dispatch(jjhApi.util.resetApiState());
      dispatch(questionApi.util.resetApiState());
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
