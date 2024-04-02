import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ResponsiveProps {
  children?: ReactNode;
}

function Desktop({ children }: ResponsiveProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? <>{children}</> : null;
}

function Expanded({ children }: ResponsiveProps) {
  const isExpanded = useMediaQuery({ minWidth: 768 });
  return isExpanded ? <>{children}</> : null;
}

function Tablet({ children }: ResponsiveProps) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? <>{children}</> : null;
}

function Portable({ children }: ResponsiveProps) {
  const isPortable = useMediaQuery({ maxWidth: 991 });
  return isPortable ? <>{children}</> : null;
}

function Mobile({ children }: ResponsiveProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? <>{children}</> : null;
}

export { Desktop, Expanded, Mobile, Portable, Tablet };
