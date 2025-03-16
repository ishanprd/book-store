import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import store from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    
    <App />
        <Toaster position="top-right"/>
  </Provider>
  </StrictMode>
)
