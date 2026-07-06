import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Expeditions from './pages/Expeditions';
import ExpeditionDetail from './pages/ExpeditionDetail';
import FieldNotes from './pages/FieldNotes';
import NoteArticle from './pages/NoteArticle';
import Places from './pages/Places';
import Studio from './pages/Studio';
import Enquire from './pages/Enquire';
import IndexPage from './pages/IndexPage';
import SystemPage from './pages/SystemPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'expeditions', element: <Expeditions /> },
      { path: 'expeditions/:id', element: <ExpeditionDetail /> },
      { path: 'field-notes', element: <FieldNotes /> },
      { path: 'field-notes/:slug', element: <NoteArticle /> },
      { path: 'places', element: <Places /> },
      { path: 'studio', element: <Studio /> },
      { path: 'enquire', element: <Enquire /> },
      { path: 'index', element: <IndexPage /> },
      { path: 'system', element: <SystemPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
