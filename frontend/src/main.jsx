import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
// import { createStore } from 'redux';
// import { CookiesProvider } from 'react-cookie';
// import {AuthProvider} from './providers/AuthProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <CookiesProvider> */}
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      {/* <AuthProvider> */}
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      {/* </AuthProvider> */}
    </Provider>
    {/* </CookiesProvider> */}
  </BrowserRouter>
);
