import { LegacyRef, useRef } from 'react'
import { Results } from '../../../../types/Results';
import { DataTableStateEvent } from 'primereact/datatable';
import { ColumnMeta, TabelaPaginado } from '../../../../components/TabelaPaginado';
import { IAlmoxarifadoProduto } from '../../../../types/IAlmoxarifadoProduto';
import { ButtonSecondary } from '../../../../components/ButtonComponent';
import { FileUpload, FileUploadHandlerEvent, FileUploadHandlerOptions } from 'primereact/fileupload';
import { enqueueSnackbar } from 'notistack';
export const baseUrl = import.meta.env.VITE_BASE_URL;

type Props = {
    data: Results<IAlmoxarifadoProduto> | undefined;
    rows: number;
    rowsPerPage: number[];
    isFetching: boolean;

    handleOnPageChange: (page: DataTableStateEvent) => void;
    handleFilterChange: (filterModel: DataTableStateEvent) => void;
    handleDelete?: ((arg: IAlmoxarifadoProduto) => void) | null;
    handleEdit?: ((arg: IAlmoxarifadoProduto) => void) | null;
    handleView?: ((arg: IAlmoxarifadoProduto) => void) | null;
    handleAdicionar?: (() => void) | null;
    uploadHandler: (event: FileUploadHandlerEvent, arg: IAlmoxarifadoProduto) => void
    downloadHandler: (arg: IAlmoxarifadoProduto) => void
};

export function AlmoxarifadoProdutoTable({
    data,
    rows,
    rowsPerPage,
    isFetching,
    handleOnPageChange,
    handleFilterChange,
    handleDelete,
    handleEdit,
    handleView,
    handleAdicionar,
    uploadHandler,
    downloadHandler,
}: Props) {
    const fileRef = useRef<FileUpload | null>(null)

    function upload(event: FileUploadHandlerEvent, data: IAlmoxarifadoProduto) {
        uploadHandler(event, data)
        fileRef.current && fileRef.current.clear()
    }
    const columns: ColumnMeta<IAlmoxarifadoProduto>[] = [
        { field: "lote", header: "Lote" },
        { field: "produto.nome", header: "Produto" },
        { field: "qtde", header: "Quantidade" },
        { field: "created", header: "Criado em" },
        {
            header: "Laudo",
            body: (data) =>
                (!data.listaArquivos || (data.listaArquivos && data.listaArquivos.length) == 0)
                    ?
                    <FileUpload
                        mode="basic"
                        name="file"
                        url={`${baseUrl}/arquivos/upload/${data.id}`}
                        accept="application/pdf"
                        maxFileSize={1000000}
                        chooseLabel='Anexar'
                        onUpload={onUpload}
                        customUpload
                        uploadHandler={(arg) => upload(arg, data)}
                        ref={fileRef}
                    />
                    :
                    <ButtonSecondary label='Download do Laudo' onClick={() => downloadHandler(data)} />
        },
    ];

    const onUpload = () => {
        enqueueSnackbar("Laudo anexado com sucesso", { variant: "success" });
    };


    return (
        <div className="col-12">
            <TabelaPaginado<IAlmoxarifadoProduto>
                hasEventoAcao
                data={data}
                columns={columns}
                isFetching={isFetching}
                rows={rows}
                rowsPerPage={rowsPerPage}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleFilterChange={handleFilterChange}
                handleOnPageChange={handleOnPageChange}
                handleAdicionar={handleAdicionar}
            />
        </div>
    )
}
