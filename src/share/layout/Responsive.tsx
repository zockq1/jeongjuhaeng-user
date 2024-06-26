import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ResponsiveProps {
  children?: ReactNode;
}

function Desktop({ children }: ResponsiveProps) {
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  return isDesktop ? <>{children}</> : null;
}

function Expanded({ children }: ResponsiveProps) {
  const isExpanded = useMediaQuery({ minWidth: 768 });
  return isExpanded ? <>{children}</> : null;
}

function Tablet({ children }: ResponsiveProps) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  return isTablet ? <>{children}</> : null;
}

function Portable({ children }: ResponsiveProps) {
  const isPortable = useMediaQuery({ maxWidth: 1279 });
  return isPortable ? <>{children}</> : null;
}

function Mobile({ children }: ResponsiveProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? <>{children}</> : null;
}

function useIsDesktop() {
  return useMediaQuery({ minWidth: 1280 });
}

function useIsExpanded() {
  return useMediaQuery({ minWidth: 768 });
}

function useIsTablet() {
  return useMediaQuery({ minWidth: 768, maxWidth: 1279 });
}

function useIsPortable() {
  return useMediaQuery({ maxWidth: 1279 });
}

function useIsMobile() {
  return useMediaQuery({ maxWidth: 767 });
}

export { Desktop, Expanded, Mobile, Portable, Tablet };
export { useIsDesktop, useIsExpanded, useIsMobile, useIsPortable, useIsTablet };
