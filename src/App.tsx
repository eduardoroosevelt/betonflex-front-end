import { BrowserRouter } from 'react-router-dom';
import { RouterApp } from './RouterApp';
import { redirect } from 'react-router-dom';

import './config/primereact';
import './config/locale';
import './styles/layout/layout.scss';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useState } from 'react';
import { ConfigCtxProvider } from './context/ConfigCtx';
function App() {
    return (
        <>
            <ConfigCtxProvider>
                <RouterApp />
            </ConfigCtxProvider>
        </>
    );
}

export default App;
