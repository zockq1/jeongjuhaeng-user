import styled from 'styled-components';

import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import { media } from '@/theme/theme';

import StaggerTestimonials from './_component/HomeCarousel';
import HomeMarquee from './_component/HomeMarquee';
import Title from './_component/Title';

export default function HomePage() {
  return (
    <>
      <Header />
      <Title />
      <StaggerTestimonials />
      <HomeMarquee />
      <FooterStyle>
        <Footer />
      </FooterStyle>
    </>
  );
}

const FooterStyle = styled.div`
  position: relative;

  height: 120px;
  margin-top: 350px;

  @media ${media.mobile} {
    margin-top: 250px;
  }
`;
