import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';

import PrivacyPolicy from './_component/PrivacyPolicy';

export default function PrivacyPage() {
  return (
    <Layout>
      <Header />
      <Layout.Full>
        <PrivacyPolicy />
      </Layout.Full>
    </Layout>
  );
}
