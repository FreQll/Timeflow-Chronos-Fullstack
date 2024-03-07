import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import ReduxToastProvider from './providers/ReduxToastr.jsx';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
// import { createStore } from 'redux';
// import { CookiesProvider } from 'react-cookie';
// import {AuthProvider} from './providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <CookiesProvider> */}
      <Provider store={store}>
          <ReduxToastProvider />
          {/* <AuthProvider> */}
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          {/* </AuthProvider> */}
      </Provider>
    {/* </CookiesProvider> */}
  </BrowserRouter>
)
