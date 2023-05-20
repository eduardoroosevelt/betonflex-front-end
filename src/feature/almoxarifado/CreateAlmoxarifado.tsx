import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Sidebar as SidebarPrime } from 'primereact/sidebar';

import { useCreateAlmoxarifadoMutation } from './almoxarifadoSlice';
import { Almoxarifado } from '../../types/Almoxarifado';
import { useForm } from 'react-hook-form';
import { WrapperComLabel } from '../../components/WrapperFormLabelInput';
import { Button } from 'primereact/button';
import classNames from 'classnames';

interface CreateAlmoxarifadoProps {
  visibleAdicionar: boolean;
  onHideAdicionar: () => void;
}

export function CreateAlmoxarifado({ visibleAdicionar, onHideAdicionar }: CreateAlmoxarifadoProps) {

  const { enqueueSnackbar } = useSnackbar();
  const [createAlmoxarifado, status] = useCreateAlmoxarifadoMutation();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Almoxarifado>({
    defaultValues: {
      almoxarifadoId: 0,
      almoxarifadoNome: "",
      almoxarifadoDescricao: "",
      almoxarifadoAtivo: true,
      almoxarifadoCreateat: "",
    }
  });

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Almxoarifado criado com  sucesso", { variant: "success" });
      onHideAdicionar();
    }
    if (status.error) {
      enqueueSnackbar("Almxoarifado não criado", { variant: "error" });

    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  async function onSubmit(data: Almoxarifado) {
    if (data.almoxarifadoNome === "") {
      setError("almoxarifadoNome", { type: "manual", message: "Nome não pode ser vazio" })
      return enqueueSnackbar("Nome não pode ser vazio", { variant: "error" });
    }
    await createAlmoxarifado(data);
  }

  return (
    <SidebarPrime onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' >
      <h3>Cadastrar Almoxarifado</h3>

      <form className='grid' onSubmit={handleSubmit(onSubmit)}>
        <WrapperComLabel cols='12' label='Nome' >
          <InputText {...register("almoxarifadoNome")} className={classNames('w-full', { 'p-invalid': errors.almoxarifadoNome })} />
          {errors.almoxarifadoNome && (
            <p role="alert" style={{ color: 'var(--red-700)' }}>
              {errors.almoxarifadoNome?.message}
            </p>
          )}
        </WrapperComLabel>

        <WrapperComLabel cols='12' label='Descrição' >
          <InputTextarea {...register("almoxarifadoDescricao")} rows={5} className={classNames('w-full')} autoResize={true} />
        </WrapperComLabel>
        <Button type="submit" severity="success" label="Salvar" className="col-12" />
      </form>
    </SidebarPrime>
  )
}
