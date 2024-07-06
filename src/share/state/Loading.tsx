import lottie from 'lottie-web/build/player/lottie_light';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import loginLoading from '@/assets/animation/user-loading.json';

const LoadingConainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: calc(100vh - 150px);

  svg {
    width: 90%;
    color: ${({ theme }) => theme.colors.bg};
  }
`;

const loadingImages = {
  login: loginLoading,
};

interface LoadingProps {
  image: keyof typeof loadingImages;
}

function Loading({ image }: LoadingProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const anim = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loadingImages[image],
      });

      return () => anim.destroy();
    }
  }, [image]);

  return (
    <LoadingConainer>
      <div ref={container} />
    </LoadingConainer>
  );
}

export default Loading;
