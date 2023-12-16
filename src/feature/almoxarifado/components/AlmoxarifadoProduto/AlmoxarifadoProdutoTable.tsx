import { LegacyRef, useRef } from 'react'
import { Results } from '../../../../types/Results';
import { DataTableStateEvent } from 'primereact/datatable';
import { ColumnMeta, TabelaPaginado } from '../../../../components/TabelaPaginado';
import { IAlmoxarifadoProduto } from '../../../../types/IAlmoxarifadoProduto';
import { ButtonIcon, ButtonPrimary, ButtonSecondary } from '../../../../components/ButtonComponent';
import { FileUpload, FileUploadHandlerEvent, FileUploadHandlerOptions } from 'primereact/fileupload';
import { enqueueSnackbar } from 'notistack';
import QRCodeLink from 'qrcode';
import { Tooltip } from 'primereact/tooltip';
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
    alterarLaudoUploadHandler: (event: FileUploadHandlerEvent, arg: IAlmoxarifadoProduto) => void
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
    alterarLaudoUploadHandler,
    downloadHandler,
}: Props) {
    const fileRef = useRef<FileUpload | null>(null)

    function upload(event: FileUploadHandlerEvent, data: IAlmoxarifadoProduto) {
        uploadHandler(event, data)
        fileRef.current && fileRef.current.clear()
    }

    function alterarLaudoUpload(event: FileUploadHandlerEvent, data: IAlmoxarifadoProduto) {
        alterarLaudoUploadHandler(event, data)
        fileRef.current && fileRef.current.clear()
    }

    const columns: ColumnMeta<IAlmoxarifadoProduto>[] = [
        { field: "lote", header: "Lote" },
        { field: "produto.nome", header: "Produto" },
        { field: "qtde", header: "Quantidade" },
        { field: "dataProducao", header: "Data de Fabricação" },
        {
            header: "Laudo",
            body: (data) =>
                (!data.listaArquivos || (data.listaArquivos && data.listaArquivos.length) == 0)
                    ?
                    <FileUpload
                        mode="basic"
                        name="file"
                        accept="application/pdf"
                        maxFileSize={1000000}
                        chooseLabel='Anexar'
                        onUpload={onUpload}
                        customUpload
                        uploadHandler={(arg) => upload(arg, data)}
                        ref={fileRef}
                    />
                    :
                    <div className='flex gap-2'>
                        <Tooltip target=".custom-choose-btn" content="Alterar" position="top" />
                        <ButtonIcon tooltip='Download' icon="pi pi-download" onClick={() => downloadHandler(data)} />
                        <FileUpload
                            mode="basic"
                            name="file"
                            accept="application/pdf"
                            maxFileSize={1000000}
                            onUpload={onUpload}
                            customUpload
                            uploadHandler={(arg) => alterarLaudoUpload(arg, data)}
                            ref={fileRef}
                            chooseOptions={{ icon: 'pi pi-sync', iconOnly: true, className: 'custom-choose-btn p-button-warning' }}

                        />
                    </div>
        },
        {
            header: 'Qrcode',
            body(data, options) {
                let qrcodeLink = JSON.stringify({
                    id: data.id,
                    lote: data.lote,
                    produto: data.produto.nome
                })

                return (
                    <div className="flex gap-2">
                        <ButtonIcon tooltip='QRCode' icon="pi pi-qrcode" onClick={() => {
                            QRCodeLink.toDataURL(qrcodeLink,
                                {
                                    width: 300,
                                    margin: 3
                                },
                                function (err, url) {
                                    if (err) throw err
                                    const link = document.createElement('a')
                                    link.href = url
                                    link.setAttribute('download', `${data.produto.nome}-${data.lote}.png`)
                                    document.body.appendChild(link)
                                    link.click()
                                })
                        }} />
                    </div>
                )
            },
        }
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
