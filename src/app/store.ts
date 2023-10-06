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
import { OrdemServicoAnexoApiSlice } from "../feature/ordemServicoAnexo/ordemServicoAnexoSlice";
import { MaterialFamiliaApiSlice } from "../feature/materiais/components/materialFamilia/MaterialFamiliaApiSlice";
import { ProdutoApiSlice } from "../feature/materiais/components/materialProduto/ProdutoApiSlice";
import { uploadQueue } from "./middleware/uploadQueue";
import { uploadReducer } from "../feature/upalod/UploadSlice";

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [almoxarifadoApiSlice.reducerPath]: apiSlice.reducer,
    [MaterialApiSlice.reducerPath]: apiSlice.reducer,
    [TipoServicoApiSlice.reducerPath]: apiSlice.reducer,
    [ClienteApiSlice.reducerPath]: apiSlice.reducer,
    [OrdemServicoApiSlice.reducerPath]: apiSlice.reducer,
    [OrdemServicoClienteApiSlice.reducerPath]: apiSlice.reducer,
    [funcionarioApiSlice.reducerPath]: apiSlice.reducer,
    [OrdemServicoMaterialApiSlice.reducerPath]: apiSlice.reducer,
    [OrdemServicoClienteApiSlice.reducerPath]: apiSlice.reducer,
    [OrdemServicoAnexoApiSlice.reducerPath]: apiSlice.reducer,
    [MaterialFamiliaApiSlice.reducerPath]: apiSlice.reducer,
    [ProdutoApiSlice.reducerPath]: apiSlice.reducer,
    uploadSlice: uploadReducer,
    auth: authSlice.reducer,
});


export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: ["uploads/addUpload, uploads/updateUpload"],
                        ignoredPaths: ["uploadSlice.file","menuReducer.menu"],
                    },
                })
                .prepend(uploadQueue.middleware)
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
