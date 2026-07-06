import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Colophon from './components/Colophon';

export default function App() {
  // Keyed on pathname so each page plays the quiet page-in fade; search-param
  // changes (list filters) keep the page mounted.
  const { pathname } = useLocation();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" key={pathname} className="page">
        <Outlet />
      </main>
      <Colophon />
      <ScrollRestoration />
    </>
  );
}
