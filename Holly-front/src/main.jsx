import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Suspense } from 'react'
import Loader from './components/loader/Loader'
import { store } from './store'
import './index.css'
import {App} from './App.jsx'
import { installDemoApi } from './bff/api/demo/demo-api'

if (import.meta.env.VITE_DEMO === 'true') {
  installDemoApi()
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loader/>}>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
    </Suspense>
  </StrictMode>,
)
