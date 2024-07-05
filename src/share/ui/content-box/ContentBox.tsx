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
  run?: boolean;
}

export default function ContentBox({
  title,
  subTitle,
  children,
  extraButton,
  lock = false,
  run = false,
}: ContentBoxProps) {
  const theme = useContext(ThemeContext);
  const { isContentBoxOn } = useSelector((state: RootState) => state.toggle);
  const [isOpen, toggle, setToggle] = useToggle(isContentBoxOn);
  const isEmpty = children === null;

  const color = lock ? theme?.colors.red : run ? theme?.colors.blue : '';

  useEffect(() => {
    setToggle(isContentBoxOn);
  }, [isContentBoxOn, setToggle]);

  return (
    <ContentBoxContainer id={title} $color={color}>
      <Header onClick={toggle}>
        <Title $color={color}>{title}</Title>
        <SubTitle $color={color}>{subTitle}</SubTitle>
        {run && (
          <div className="icon">
            <Icon icon="run" color={theme?.colors.blue} size={30} />
          </div>
        )}
      </Header>
      {!lock ? (
        <>
          {!isEmpty && isOpen && <Content>{children}</Content>}
          <Footer>
            {!isEmpty && (
              <ToggleButton
                onClick={toggle}
                aria-label={isOpen ? 'up' : 'down'}
              >
                {isOpen ? (
                  <Icon icon="up" size={40} color={color} />
                ) : (
                  <Icon icon="down" size={40} color={color} />
                )}
              </ToggleButton>
            )}
            {extraButton && (
              <ExtraButtonContainer>{extraButton}</ExtraButtonContainer>
            )}
          </Footer>
        </>
      ) : (
        <div className="icon">
          <Icon icon="lock" color={theme?.colors.red} size={30} />
        </div>
      )}
    </ContentBoxContainer>
  );
}

const ContentBoxContainer = styled.article<{ $color?: string }>`
  overflow: hidden;
  position: relative;

  margin: 15px 5px;
  border: 2px solid
    ${({ theme, $color }) => ($color ? $color : theme.colors.textBlue)};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme, $color }) => ($color ? $color : theme.colors.textBlue)};

  div.icon {
    position: absolute;
    top: 50%;
    right: 10px;

    transform: translateY(-50%);
  }
`;

const Header = styled.header`
  position: relative;

  padding: 15px;

  cursor: pointer;
`;

const Title = styled.h1<{ $color?: string }>`
  color: ${({ $color, theme }) => ($color ? $color : theme.colors.textBlue)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl};

  word-break: keep-all;
`;

const SubTitle = styled.h2<{ $color?: string }>`
  margin-top: 5px;

  color: ${({ theme, $color }) => ($color ? $color : theme.colors.grey)};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Content = styled.section`
  padding: 15px;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;
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
