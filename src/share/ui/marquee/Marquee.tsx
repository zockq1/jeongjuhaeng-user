import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
}

export default function Marquee({ children, reverse }: MarqueeProps) {
  return (
    <MarqueeContainer
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </MarqueeContainer>
  );
}

const MarqueeContainer = styled(motion.div)`
  display: flex;

  padding-right: 2px;
  padding-left: 2px;
`;
