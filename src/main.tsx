import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import './index.css';
import { setupStore } from "./app/store";
// import { KeycloakProvider } from './providers/KeycloakProvider';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './providers/PrintToast';
const store = setupStore();

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <Provider store={store}>
//         <React.StrictMode>
//             <ToastProvider>
//                 <BrowserRouter basename='betonflex'>
//                     <App />
//                 </BrowserRouter>
//             </ToastProvider>
//         </React.StrictMode>
//     </Provider>
// );

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

