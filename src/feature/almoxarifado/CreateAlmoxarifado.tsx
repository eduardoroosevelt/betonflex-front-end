import { useEffect } from 'react'
import { useSnackbar } from 'notistack';
import { Sidebar as SidebarPrime } from 'primereact/sidebar';

import { useCreateAlmoxarifadoMutation } from './almoxarifadoSlice';
import { IAlmoxarifado } from '../../types/IAlmoxarifado';
import { useForm } from 'react-hook-form';
import { AlmoxarifadoForm } from './components/AlmoxarifadoForm';

interface CreateAlmoxarifadoProps {
  visibleAdicionar: boolean;
  onHideAdicionar: () => void;
}

export function CreateAlmoxarifado({ visibleAdicionar, onHideAdicionar }: CreateAlmoxarifadoProps) {

  const { enqueueSnackbar } = useSnackbar();
  const [createAlmoxarifado, status] = useCreateAlmoxarifadoMutation();
  const { control, handleSubmit, formState: { errors } } = useForm<IAlmoxarifado>({
    defaultValues: {
      nome: "",
      descricao: "",
    }
  });

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Almxoarifado criado com  sucesso", { variant: "success" });
      onHideAdicionar();
    }

  }, [status.isSuccess]);

  function onSubmit(data: IAlmoxarifado) {
    createAlmoxarifado(data);
  }

  return (
    <SidebarPrime onHide={onHideAdicionar} visible={visibleAdicionar} className="w-11 md:w-4" position='right' blockScroll>
      <h3>Cadastrar Almoxarifado</h3>

      <AlmoxarifadoForm
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        isLoading={status.isLoading}
        onGoBack={onHideAdicionar}
      />
    </SidebarPrime>
  )
}
