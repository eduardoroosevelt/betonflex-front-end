import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import './index.css';
import { setupStore } from "./app/store";
import { KeycloakProvider } from './providers/KeycloakProvider';
import { BrowserRouter } from 'react-router-dom';
const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <KeycloakProvider>
            <React.StrictMode>
                <BrowserRouter basename='betonflex'>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        </KeycloakProvider>
    </Provider>
);
