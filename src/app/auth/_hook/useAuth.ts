import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import { useGetOAuthTokenQuery } from '@/store/api/authApi';
import { usePolicyAgreeMutation } from '@/store/api/withdrawalApi';
import {
  login,
  setAccessToken,
  setId,
  setRefreshToken,
} from '@/store/slices/authSlice';
import { ServiceType } from '@/types/authTypes';

export default function useAuth(serviceType: ServiceType) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useQuesryString();
  const [policyAgree] = usePolicyAgreeMutation();
  const { data, isLoading, isError, error } = useGetOAuthTokenQuery(
    {
      serviceType: serviceType,
      code: code ? code : '',
      local: `${import.meta.env.VITE_IP}/oauth/kakao/login`,
      protocol: `${import.meta.env.VITE_PROTOCOL}`,
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (data) {
      if (!data.isNew) {
        dispatch(setAccessToken(data.accessToken));
        dispatch(setRefreshToken(data.refreshToken));
        dispatch(setId(data.id));
        dispatch(login());
        navigate('/', { replace: true });
      }
    }
  }, [data, dispatch, navigate]);

  const handleSubmit = async () => {
    try {
      dispatch(setAccessToken(data?.accessToken));
      dispatch(setRefreshToken(data?.refreshToken));
      dispatch(setId(data?.id));
      dispatch(login());
      await policyAgree().unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      alert(error);
    }
  };

  return { handleSubmit, data, isLoading, isError, error };
}
