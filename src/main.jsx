import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { armReveal } from './lib/reveal';

import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/type.css';

armReveal();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
