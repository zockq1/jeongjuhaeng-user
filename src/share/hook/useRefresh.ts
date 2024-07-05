import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, setRefreshToken } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

export default function useRefresh() {
  const dispatch = useDispatch();
  const { refreshToken, accessToken, isLoggedIn } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    isLoggedIn &&
      fetch(`${import.meta.env.VITE_API_URL}refresh-token`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
          'Refresh-Token': refreshToken,
        },
      }).then((response) => {
        dispatch(setRefreshToken(response.headers.get('Refresh-Token')));
        dispatch(setAccessToken(response.headers.get('Authorization')));
      });
  }, [accessToken, refreshToken, dispatch, isLoggedIn]);
  return;
}
