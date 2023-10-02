import { useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useGetMaterialQuery, useUpdateMaterialMutation } from './materialSlice';
import { IMaterial } from '../../types/Material';
import { useNavigate, useParams } from 'react-router-dom';
import { MaterialForm } from './components/MaterialForm';
import { TabView, TabPanel } from 'primereact/tabview';
import CardWrapper from '../../components/CardWrapper';
import { MaterialFamilia } from './components/materialFamilia/MaterialFamilia';
import { Produto } from './components/materialProduto/Produto';

export function EditMaterial() {
    const id = useParams().id;
    const { enqueueSnackbar } = useSnackbar();
    const { data: material, isFetching, refetch } = useGetMaterialQuery({ id: parseInt(id!) })
    const [updateMaterial, status] = useUpdateMaterialMutation();
    const navigation = useNavigate();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<IMaterial>({
        defaultValues: {
            id: 0,
            nome: "",
            descricao: "",
            ativo: true,
            created: "",
        }
    });

    useEffect(() => {
        if (material) {
            reset(material)
        }
    }, [material])

    useEffect(() => {
        if (status.isSuccess) {
            setTimeout(() => {
                navigation('/app/cadastro/material')
            }, 0);
            enqueueSnackbar("Material alterado com sucesso", { variant: "success" });
        }
        if (status.error) {
            enqueueSnackbar("Erro  ao alterar o material", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: IMaterial) {
        await updateMaterial(data);
    }

    function goBack() {
        navigation('/app/cadastro/material')
    }

    return (
        <CardWrapper>
            <h3 className='col-12'>Editar Material</h3>
            <TabView className='col-12'>
                <TabPanel header="Material">
                    <MaterialForm
                        handleSubmit={handleSubmit(onSubmit)}
                        erros={errors}
                        register={register}
                    />
                </TabPanel>
                <TabPanel header="Família">
                    {material && <MaterialFamilia material={material} />}
                </TabPanel>
                <TabPanel header="Produto">
                    {material && <Produto material={material} />}
                </TabPanel>
            </TabView>
        </CardWrapper>
    )
}
