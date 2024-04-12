import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import OptionList from './_component/OptionList';
import User from './_component/User';

export default function OptionPage() {
  return (
    <Layout>
      <Header />
      <Layout.Full>
        <User />
        <OptionList />
      </Layout.Full>
    </Layout>
  );
}
