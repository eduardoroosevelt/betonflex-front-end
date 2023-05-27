import React from 'react'
import { FileUpload } from 'primereact/fileupload';

interface OrdemServicoTabClienteProps {
    ordemServicoId: number;
}

export function OrdemServicoTabAnexo({ ordemServicoId }: OrdemServicoTabClienteProps) {
    return (
        <div>
            <div className="card">
                <FileUpload
                    name="file"
                    url={`http://localhost:8083/ordemservicos/upload/${ordemServicoId}`}
                    multiple accept="*"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}

                />
            </div>
        </div>
    )
}
