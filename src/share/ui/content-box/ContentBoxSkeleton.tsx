import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

interface ContentBoxProps {
  count?: number;
}

export default function ContentBoxSkeleton({ count = 2 }: ContentBoxProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ContentBoxContainer key={index}>
          <Header>
            <Title>
              <Skeleton width="100px" height="22px" borderRadius="5px" />
            </Title>
            <SubTitle>
              <Skeleton width="150px" height="14px" borderRadius="5px" />
            </SubTitle>
          </Header>
          <Content>
            <Line>
              <Skeleton width="6px" height="350px" borderRadius="5px" />
            </Line>
            <Skeleton
              width="50px"
              height="16px"
              borderRadius="5px"
              style={{ marginLeft: '40px', marginTop: '15px' }}
            />
            <Skeleton
              width="220px"
              height="70px"
              borderRadius="5px"
              style={{ marginLeft: '40px', marginTop: '15px' }}
            />
            <Skeleton
              width="160px"
              height="70px"
              borderRadius="5px"
              style={{ marginLeft: '40px', marginTop: '15px' }}
            />
            <Skeleton
              width="50px"
              height="16px"
              borderRadius="5px"
              style={{ marginLeft: '40px', marginTop: '15px' }}
            />
            <Skeleton
              width="250px"
              height="70px"
              borderRadius="5px"
              style={{ marginLeft: '40px', marginTop: '15px' }}
            />
          </Content>
          <Footer>
            <Skeleton width="100px" height="22px" borderRadius="5px" />
            <Skeleton width="100px" height="22px" borderRadius="5px" />
          </Footer>
        </ContentBoxContainer>
      ))}
    </>
  );
}

const ContentBoxContainer = styled.article`
  overflow: hidden;
  position: relative;

  height: 500px;
  margin: 15px 5px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.header`
  position: relative;

  padding: 15px;

  cursor: pointer;
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

const SubTitle = styled.h2`
  margin-top: 5px;

  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Content = styled.section`
  position: relative;
  padding: 15px;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 40px;
`;

const Line = styled.div`
  position: absolute;
  left: 29px;
`;
