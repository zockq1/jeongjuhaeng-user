import Header from '@/share/layout/header';

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
  );
}
