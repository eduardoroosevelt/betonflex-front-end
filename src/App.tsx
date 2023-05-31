import { RouterApp } from './RouterApp';

import './config/locale';
import './config/primereact';
import { ConfigCtxProvider } from './context/ConfigCtx';
import './styles/layout/layout.scss';
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
