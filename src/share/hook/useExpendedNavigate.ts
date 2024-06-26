import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIsExpanded } from '../layout/Responsive';

export default function useExpendedNavigate(to: string) {
  const navigate = useNavigate();
  const isExpanded = useIsExpanded();
  useEffect(() => {
    if (isExpanded) {
      navigate(to, {
        replace: true,
      });
    }
  }, [navigate, isExpanded, to]);
}
