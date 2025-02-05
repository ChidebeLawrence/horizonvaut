import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer
            position="bottom-left"
            hideProgressBar={false}
            theme="colored"
            closeOnClick
            pauseOnFocusLoss={false}
          />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
