import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

// HashRouter keeps deep links working on any static host (GitHub Pages, etc.)
// without server-side rewrite rules.
createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>,
);
