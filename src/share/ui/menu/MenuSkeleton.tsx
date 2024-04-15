import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import { media } from '@/theme/theme';

interface MenuProps {
  count?: number;
}

export default function MenuSkeleton({ count = 5 }: MenuProps) {
  return (
    <SkeletonContainer>
      <Skeleton
        width="calc(100% - 32px)"
        height="19px"
        borderRadius="5px"
        count={count}
        style={{ margin: '15px' }}
      />
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.ul`
  margin: 5px;

  @media ${media.expanded} {
    height: calc(100vh - 150px);
  }

  @media ${media.mobile} {
    border: 2px solid ${({ theme }) => theme.colors.textBlue};
    border-radius: 10px;

    background: ${({ theme }) => theme.colors.white};
  }
`;
