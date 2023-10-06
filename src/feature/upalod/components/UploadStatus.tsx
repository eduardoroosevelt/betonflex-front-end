import { ProgressBar } from 'primereact/progressbar'
import React from 'react'
import { STATUS, Status } from '../UploadSlice'

interface Props {
    status?: Status;
    progress?: number;
}

export function UploadStatus({ status, progress }: Props) {
    switch (status) {
        case STATUS.SUCCESS:
            return <i className="pi pi-check" style={{ fontSize: '1.5rem', color: 'var(--green-600)' }}></i>  //<CheckCircleOutlineIcon color="success" />;
        case STATUS.FAILED:
            return <i className="pi pi-ban" style={{ fontSize: '1.5rem', color: 'var(--red-600)' }}></i> //<ErrorOutlineIcon color="error" />;
        default:
            return (
                <div>
                    <ProgressBar value={progress} style={{ height: "1.3rem" }}></ProgressBar>
                </div>
            )
    }
}
