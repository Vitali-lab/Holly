import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import { App } from './app/App';
import Loader from './shared/ui/loader/Loader';
import { store } from './app/store/store';
import './index.css';

const loader = document.getElementById('loader-container');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          {loader && loader.remove()}
        </BrowserRouter>
      </Provider>
    </Suspense>
  </StrictMode>
);
