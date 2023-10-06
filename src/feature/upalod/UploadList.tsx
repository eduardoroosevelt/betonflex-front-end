import React from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUploads, STATUS, cleanAllUploads } from './UploadSlice';
import { UploadItem } from './components/UploadItem';
import style from './UploadListStyle.module.css'
import { Button } from 'primereact/button';

export function UploadList() {

    const uploadList = useAppSelector(selectUploads);
    const dispatch = useAppDispatch()

    if (!uploadList || uploadList.length === 0) {
        return null;
    }

    function clear() {
        dispatch(cleanAllUploads())
    }

    const isMostrarBotaoLimpar = uploadList.filter(upload => upload.status == STATUS.LOADING || upload.status == STATUS.IDDLE).length == 0

    return (
        <div className="fixed right-0 bottom-0 w-full sm:w-30rem z-1">
            <Accordion activeIndex={0}>
                <AccordionTab header="Uploads">
                    <div className={style.container}>

                        {uploadList.map((upload, index) => (
                            <UploadItem upload={upload} />
                        ))}

                        {
                            isMostrarBotaoLimpar &&
                            <Button label="Limpar lista" onClick={clear} />
                        }
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    )
}
