import { lazy } from 'react';

import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Async from '@/share/state/Async';
import Error from '@/share/state/Error';

import PolicyAgree from './_component/PolicyAgree';
import useAuth from './_hook/useAuth';

const Loading = lazy(() => import('@/share/state/Loading'));

export default function KakaoLoginPage() {
  const { data, isLoading, isError, error, handleSubmit } = useAuth('kakao');

  return (
    <Layout>
      <Header />
      <Layout.Main>
        <Async
          data={data}
          isLoading={isLoading}
          loadingComponent={<Loading image="login" />}
          isError={isError}
          errorComponent={
            error && <Error error={error} message="로그인에 실패하였습니다." />
          }
        >
          {(authData) => (
            <>{authData.isNew && <PolicyAgree onSubmit={handleSubmit} />}</>
          )}
        </Async>
      </Layout.Main>
      <Footer />
    </Layout>
  );
}
