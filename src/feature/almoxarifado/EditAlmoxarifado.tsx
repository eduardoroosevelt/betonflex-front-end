import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Almoxarifado, useGetAlmoxarifadoQuery, useUpdateAlmoxarifadoMutation } from './almoxarifadoSlice';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';
import { TabPanel, TabView } from 'primereact/tabview';
import { AlmoxarifadoMaterial } from './components/AlmoxarifadoMaterial';

export function EditAlmoxarifado() {
    const id = useParams().id;
    const { enqueueSnackbar } = useSnackbar();
    const { data: almoxarifado, isFetching, refetch } = useGetAlmoxarifadoQuery({ almoxarifadoId: parseInt(id!) })
    const [updateAlmoxarifado, status] = useUpdateAlmoxarifadoMutation();
    const navigation = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Almoxarifado>({
        defaultValues: {
            almoxarifadoId: almoxarifado?.almoxarifadoId,
            almoxarifadoNome: almoxarifado?.almoxarifadoNome,
            almoxarifadoDescricao: almoxarifado?.almoxarifadoDescricao,
            almoxarifadoAtivo: almoxarifado?.almoxarifadoAtivo,
            almoxarifadoCreateat: almoxarifado?.almoxarifadoCreateat,
        }
    });

    useEffect(() => {
        if (almoxarifado) {
            setValue("almoxarifadoId", almoxarifado?.almoxarifadoId)
            setValue("almoxarifadoNome", almoxarifado?.almoxarifadoNome)
            setValue("almoxarifadoDescricao", almoxarifado?.almoxarifadoDescricao)
            setValue("almoxarifadoAtivo", almoxarifado?.almoxarifadoAtivo)
            setValue("almoxarifadoCreateat", almoxarifado?.almoxarifadoCreateat)
        }
    }, [almoxarifado])

    useEffect(() => {
        if (status.isSuccess) {
            setTimeout(() => {
                navigation('/app/cadastro/almoxarifado')
            }, 0);
            enqueueSnackbar("Almoxarifado alterado com sucesso", { variant: "success" });
        }
        if (status.error) {
            enqueueSnackbar("Almoxarifado ap alterar o almoxarifado", { variant: "error" });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess]);

    async function onSubmit(data: Almoxarifado) {
        await updateAlmoxarifado(data);
    }

    return (
        <div>
            <h3>Editar Almoxarifado</h3>

            <TabView>
                <TabPanel header="Dados Gerais">
                    <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                        <WrapperComLabel cols='12' label='Nome' >
                            <InputText {...register("almoxarifadoNome")} className={classNames('w-full')} />
                        </WrapperComLabel>
                        <WrapperComLabel cols='12' label='Descrição' >
                            <InputTextarea {...register("almoxarifadoDescricao")} rows={5} className={classNames('w-full')} autoResize={true} />
                        </WrapperComLabel>
                        <Button type="submit" severity="success" label="Salvar" className="col-12" />
                    </form>
                </TabPanel>
                <TabPanel header="Materiais">
                    <AlmoxarifadoMaterial almoxarifadoId={parseInt(id!)} />
                </TabPanel>
            </TabView>

        </div>
    )
}
