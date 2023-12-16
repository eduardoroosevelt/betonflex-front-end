import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterApp } from './RouterApp';

import { ConfigCtxProvider } from './context/ConfigCtx';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';

import './config/locale';
import './config/primereact';
import './styles/layout/layout.scss';
import { ToastProvider } from './providers/PrintToast';

const store = setupStore();
function App() {
    return (
        <>
            <Provider store={store}>
                <React.StrictMode>
                    <ConfigCtxProvider>
                        <ToastProvider>
                            <BrowserRouter basename='betonflex'>
                                <RouterApp />
                            </BrowserRouter>
                        </ToastProvider>
                    </ConfigCtxProvider>
                </React.StrictMode>
            </Provider>


        </>
    );
}

export default App;
