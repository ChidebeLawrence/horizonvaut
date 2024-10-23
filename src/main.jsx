import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
                <ToastContainer
                    position="bottom-left"
                    hideProgressBar={false}
                    theme="colored"
                    closeOnClick
                    pauseOnFocusLoss={false}
                />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
