import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import getRandomNumber from '@/share/util/getRandomNumber';
import { media } from '@/theme/theme';

interface MenuProps {
  count?: number;
}

export default function MenuSkeleton({ count = 5 }: MenuProps) {
  return (
    <SkeletonContainer>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          width={`${getRandomNumber(20, 60)}%`}
          height="19px"
          borderRadius="5px"
          style={{ margin: '15px' }}
        />
      ))}
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
