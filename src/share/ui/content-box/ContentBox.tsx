import { ReactNode, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';

import useToggle from '@/share/hook/useToggle';
import { RootState } from '@/store/store';

import Icon from '../icon/Icon';

interface ContentBoxProps {
  title: string;
  subTitle?: string;
  children?: ReactNode;
  extraButton?: ReactNode;
  lock?: boolean;
}

export default function ContentBox({
  title,
  subTitle,
  children,
  extraButton,
  lock = false,
}: ContentBoxProps) {
  const theme = useContext(ThemeContext);
  const { isContentBoxOn } = useSelector((state: RootState) => state.toggle);
  const [isOpen, toggle, setToggle] = useToggle(isContentBoxOn);
  const isEmpty = children === null;

  useEffect(() => {
    setToggle(isContentBoxOn);
  }, [isContentBoxOn, setToggle]);

  return (
    <ContentBoxContainer id={title}>
      <Header onClick={toggle}>
        <Title $color={lock ? theme?.colors.red : ''}>{title}</Title>
        <SubTitle $color={lock ? theme?.colors.lightRed : ''}>
          {subTitle}
        </SubTitle>
      </Header>
      {!lock && (
        <>
          {!isEmpty && isOpen && <Content>{children}</Content>}
          <Footer>
            {!isEmpty && (
              <ToggleButton onClick={toggle}>
                {isOpen ? (
                  <Icon icon="up" size={40} />
                ) : (
                  <Icon icon="down" size={40} />
                )}
              </ToggleButton>
            )}
            {extraButton && (
              <ExtraButtonContainer>{extraButton}</ExtraButtonContainer>
            )}
          </Footer>
        </>
      )}
    </ContentBoxContainer>
  );
}

const ContentBoxContainer = styled.article`
  overflow: hidden;

  margin: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 10px;

  user-select: none;
`;

const Header = styled.header`
  padding: 15px;

  background-color: ${({ theme }) => theme.colors.white};

  cursor: pointer;
`;

const Title = styled.h1<{ $color?: string }>`
  color: ${({ $color, theme }) => ($color ? $color : theme.colors.textBlue)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

const SubTitle = styled.h2<{ $color?: string }>`
  margin-top: 5px;

  color: ${({ theme, $color }) => ($color ? $color : theme.colors.grey)};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Content = styled.section`
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;

  background-color: ${({ theme }) => theme.colors.white};
`;

const ToggleButton = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const ExtraButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;