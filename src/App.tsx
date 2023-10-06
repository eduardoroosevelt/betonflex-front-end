import { RouterApp } from './RouterApp';

import './config/locale';
import './config/primereact';
import { ConfigCtxProvider } from './context/ConfigCtx';
import { UploadList } from './feature/upalod/UploadList';
import './styles/layout/layout.scss';
function App() {
    return (
        <>
            <ConfigCtxProvider>
                <UploadList />
                <RouterApp />
            </ConfigCtxProvider>
        </>
    );
}

export default App;
