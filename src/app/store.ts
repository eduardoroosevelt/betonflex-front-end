import {
    Action,
    combineReducers,
    configureStore,
    PreloadedState,
    ThunkAction,
} from "@reduxjs/toolkit";
import { apiSlice } from "../feature/api/apiSlice";
import { almoxarifadoApiSlice } from "../feature/almoxarifado/almoxarifadoSlice";
import { MaterialApiSlice } from "../feature/materiais/materialSlice";
import { TipoServicoApiSlice } from "../feature/tipoServico/TipoServicoSlice";
import { ClienteApiSlice } from "../feature/cliente/ClienteSlice";
import { authSlice } from "../feature/auth/authSlice";
import { OrdemServicoApiSlice } from "../feature/ordemServico/OrdemServico.slice";
import { OrdemServicoClienteApiSlice } from "../feature/ordemServicoCliente/OrdemServicoClienteSlice";
import { funcionarioApiSlice } from "../feature/funcionario/FuncionarioSlice";
import { OrdemServicoMaterialApiSlice } from "../feature/ordemServicoMaterial/OrdemServicoMaterial";

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [almoxarifadoApiSlice.reducerPath]: almoxarifadoApiSlice.reducer,
    [MaterialApiSlice.reducerPath]: MaterialApiSlice.reducer,
    [TipoServicoApiSlice.reducerPath]: TipoServicoApiSlice.reducer,
    [ClienteApiSlice.reducerPath]: ClienteApiSlice.reducer,
    [OrdemServicoApiSlice.reducerPath]: OrdemServicoApiSlice.reducer,
    [OrdemServicoClienteApiSlice.reducerPath]: OrdemServicoClienteApiSlice.reducer,
    [funcionarioApiSlice.reducerPath]: funcionarioApiSlice.reducer,
    [OrdemServicoMaterialApiSlice.reducerPath]: OrdemServicoMaterialApiSlice.reducer,
    auth: authSlice.reducer,
});


export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                // serializableCheck: {
                //     ignoredActions: ["uploads/addUpload, uploads/updateUpload"],
                //     ignoredPaths: ["uploadSlice.file"],
                // },
            })
                //   .prepend(uploadQueue.middleware)
                .concat(apiSlice.middleware),
    });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
