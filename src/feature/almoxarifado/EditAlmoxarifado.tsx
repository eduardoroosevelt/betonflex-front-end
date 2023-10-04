import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAlmoxarifadoQuery, useUpdateAlmoxarifadoMutation } from './almoxarifadoSlice';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { TabPanel, TabView } from 'primereact/tabview';
import { IAlmoxarifado } from '../../types/IAlmoxarifado';
import { AlmoxarifadoForm } from './components/AlmoxarifadoForm';
import CardWrapper from '../../components/CardWrapper';
import { AlmoxarifadoProduto } from './components/AlmoxarifadoProduto/AlmoxarifadoProduto';

export function EditAlmoxarifado() {
    const id = useParams().id;
    const { enqueueSnackbar } = useSnackbar();
    const { data: almoxarifado } = useGetAlmoxarifadoQuery({ id: parseInt(id!) })
    const [updateAlmoxarifado, status] = useUpdateAlmoxarifadoMutation();
    const navigation = useNavigate();

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IAlmoxarifado>({
        defaultValues: {
            nome: "",
            descricao: "",
        }
    });

    useEffect(() => {
        if (almoxarifado) {
            reset(almoxarifado)
        }
    }, [almoxarifado])

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Almoxarifado alterado com sucesso", { variant: "success" });
        }
    }, [status.isSuccess]);

    async function onSubmit(data: IAlmoxarifado) {
        updateAlmoxarifado(data);
    }

    function goBack() {
        navigation('/app/cadastro/almoxarifado')
    }

    return (
        <CardWrapper title='Editar Almoxarifado'>
            <TabView className='col-12'>
                <TabPanel header="Dados Gerais">
                    <AlmoxarifadoForm
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        control={control}
                        isLoading={status.isLoading}
                        onGoBack={goBack}
                    />
                </TabPanel>
                <TabPanel header="Produtos">
                    {almoxarifado && <AlmoxarifadoProduto almoxarifado={almoxarifado} />}
                </TabPanel>
            </TabView>
        </CardWrapper>
    )
}
