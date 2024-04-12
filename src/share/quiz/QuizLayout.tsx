import { ReactNode } from 'react';
import styled from 'styled-components';

import { media } from '@/theme/theme';

interface LayoutProps {
  children?: ReactNode;
}

export default function QuizLayout({ children }: LayoutProps) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

function Navigation({ children }: LayoutProps) {
  return <NavigationContainer>{children}</NavigationContainer>;
}

function Button({ children }: LayoutProps) {
  return <ButtonContainer>{children}</ButtonContainer>;
}

function Description({ children }: LayoutProps) {
  return <DescriptionContainer>{children}</DescriptionContainer>;
}

function Choice({ children }: LayoutProps) {
  return <ChoiceContainer>{children}</ChoiceContainer>;
}

const LayoutContainer = styled.div`
  display: grid;
  position: relative;

  width: 100%;

  @media ${media.mobile} {
    grid-template:
      'navigation ' auto
      'description' auto
      'choice     ' auto
      'button     ' auto / 100%;
  }

  @media ${media.expanded} {
    grid-template:
      'navigation  navigation ' auto
      'button      button     ' auto
      'description choice     ' auto / 1fr 1fr;
  }
`;

const NavigationContainer = styled.nav`
  width: 100%;
  height: 100%;
  padding: 5px;

  grid-area: navigation;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;

  grid-area: button;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;

  grid-area: description;
`;

const ChoiceContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;

  grid-area: choice;
`;

QuizLayout.Navigation = Navigation;
QuizLayout.Button = Button;
QuizLayout.Description = Description;
QuizLayout.Choice = Choice;
