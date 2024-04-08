import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <main>
      <Outlet />
    </main>
  );
}
