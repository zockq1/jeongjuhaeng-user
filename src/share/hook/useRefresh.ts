import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

export default function useRefresh() {
  const { refreshToken, accessToken } = useSelector(
    (state: RootState) => state.auth,
  );
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}refresh-token`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'Refresh-Token': refreshToken,
      },
    });
  }, [accessToken, refreshToken]);
  return;
}
