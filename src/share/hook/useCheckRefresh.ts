import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { jjhApi, useLazyGetTotalProgressQuery } from '../../store/api/jjhApi';
import { RootState } from '../../store/store';

export default function useCheckRefresh() {
  const [triger] = useLazyGetTotalProgressQuery();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isMounted.current) {
      if (isLoggedIn) {
        triger().then(() =>
          dispatch(jjhApi.util.invalidateTags(['jjhUpdate'])),
        );
      } else {
        dispatch(jjhApi.util.invalidateTags(['jjhUpdate']));
      }
    } else {
      isMounted.current = true;
    }
  }, [isLoggedIn, dispatch, triger]);
}
