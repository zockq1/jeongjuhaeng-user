import Header from '@/share/layout/header';
import MobileHeader from '@/share/layout/header/MobileHeader';
import Layout from '@/share/layout/Layout';
import { Mobile } from '@/share/layout/Responsive';

import StaggerTestimonials from './_component/CardList';
import Ribbon from './_component/Ribbon';
import Title from './_component/Title';

export default function HomePage() {
  return (
    <>
      <Header />
      <Title />
      <StaggerTestimonials />
      <Ribbon />
    </>
    // <Layout>
    //   <Header />
    //   <Layout.Left></Layout.Left>
    //   <Layout.Full>
    //     <StaggerTestimonials />
    //     <Ribbon />
    //   </Layout.Full>
    //   <Layout.Right></Layout.Right>
    // </Layout>
  );
}
