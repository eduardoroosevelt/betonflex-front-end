import React from 'react';
import { UploadState } from "../UploadSlice";
import style from './UploadItemStyle.module.css';
import { UploadStatus } from './UploadStatus';

type Props = {
    upload: UploadState;
};

export function UploadItem({ upload }: Props) {

    return (
        <div className={style.containerItem}>
            <i className="pi pi-book" style={{ fontSize: '1.5rem' }}></i>
            <span>{upload.field}</span>
            <div className={style.progress}>
                <UploadStatus status={upload.status} progress={upload.progress} />
            </div>
        </div>
    )
}
