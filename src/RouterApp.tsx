import { Routes, Route, Navigate } from 'react-router-dom';

import { AppLayout } from './layout/AppLayout';
import { LayoutProvider } from './layout/context/layoutcontext';
import { NotFound } from './pages/404';
import { Dashboard } from './pages/app/Dashboard';
import { ListAlmoxarifado } from './feature/almoxarifado/ListAlmoxarifado';
import { EditAlmoxarifado } from './feature/almoxarifado/EditAlmoxarifado';
import ListCliente from './feature/cliente/ListCliente';
import { ListMaterial } from './feature/materiais/ListMaterial';
import ListOrdemServico from './feature/ordemServico/ListOrdemServico';
import { EditMaterial } from './feature/materiais/EditMaterial';
import { ListTipoServico } from './feature/tipoServico/ListTipoServico';
import { EditTipoServico } from './feature/tipoServico/EditTipoServico';
import { EditCliente } from './feature/cliente/EditCliente';

export function RouterApp() {
    return (
        <LayoutProvider>
            <Routes>

                <Route path="/">
                    {/* <Route path="/login" element={<Login />} /> */}
                </Route>

                <Route path="/app" element={<AppLayout />} >
                    <Route path="/app" element={<Dashboard />} />
                    <Route path="/app/cadastro/almoxarifado" element={<ListAlmoxarifado />} />
                    <Route path="/app/cadastro/almoxarifado/edit/:id" element={<EditAlmoxarifado />} />

                    <Route path="/app/cadastro/material" element={<ListMaterial />} />
                    <Route path="/app/cadastro/material/edit/:id" element={<EditMaterial />} />

                    <Route path="/app/cadastro/cliente" element={<ListCliente />} />
                    <Route path="/app/cadastro/cliente/edit/:id" element={<EditCliente />} />

                    <Route path="/app/cadastro/ordemServico" element={<ListOrdemServico />} />

                    <Route path="/app/cadastro/tipo-servico" element={<ListTipoServico />} />
                    <Route path="/app/cadastro/tipo-servico/edit/:id" element={<EditTipoServico />} />


                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </LayoutProvider>
    );
}
