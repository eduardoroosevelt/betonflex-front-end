import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";

interface CardExibirPDFProps {
    isExibirPDF: boolean,
    modal?: boolean,
    alturaTela?: string,
    tituloTela?: string,
    tamanhoTela?: string,
    stringPDF: string,
    onHide: () => void,
};

export function CardExibirPDFProps({ isExibirPDF, modal = true, alturaTela, tituloTela, tamanhoTela, stringPDF, onHide }: CardExibirPDFProps) {
    const dimensaoTela = () => {
        let tela = {};
        let tipo = stringPDF.split(";");
        if (tamanhoTela && tamanhoTela.indexOf(".") > 0) {
            let css = tamanhoTela.split(".");
            tela = { ...tela, width: `${css[0]}${css[1]}` };
        } else if (tamanhoTela) {
            tela = { ...tela, width: `${tamanhoTela}px` };
        }

        if (tipo[0].includes("data:") && alturaTela && alturaTela.indexOf(".") > 0) {
            let css = alturaTela.split(".");
            tela = { ...tela, height: `${css[0]}${css[1]}` };
        } else if (tipo[0].includes("data:") && alturaTela) {
            tela = { ...tela, height: `${alturaTela}px` };
        }
        return tela;
    };

    const isPDF = () => {
        let tipo = stringPDF.split(";");
        if (tipo.length > 0) {
            if (tipo[0].includes("data:application/pdf")) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    const handleOnHide = () => {
        if (onHide) {
            onHide();
        }
    };

    function base64ToBlob(base64: string, type = "application/octet-stream") {
        const binStr = atob(base64);
        const len = binStr.length;
        const arr = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
        }
        return new Blob([arr], { type: type });
    }

    let base64 = stringPDF
    let type = 'application/pdf'

    if (stringPDF.indexOf(',') > 0) {

        let array = stringPDF.split(';')

        base64 = stringPDF.split(',')[1]

        if (array.length > 1) {
            type = array[0].replace("data:", '')
        }
    }

    const blob = base64ToBlob(base64, type)
    const arquivo = URL.createObjectURL(blob);

    return (
        <>
            {isExibirPDF && (
                <Dialog
                    onHide={handleOnHide}
                    header={tituloTela}
                    style={{ width: "50vw", height: "500vw" }}
                    maximizable
                    blockScroll
                    dismissableMask
                    visible={isExibirPDF}
                    modal={modal}
                    position={"center"}
                    contentStyle={dimensaoTela()}
                >
                    {/* {isPDF() ? <embed style={{ width: "100%", height: "99%" }} src={stringPDF} /> : <embed src={stringPDF} />} */}
                    <iframe style={{ width: "100%", height: "99%" }} src={arquivo} />
                    {/* {isPDF() ? <iframe style={{ width: "100%", height: "99%" }} src={arquivo} /> : <iframe src={arquivo} />} */}
                    {/* </Dialog> */}
                </Dialog>
            )}
        </>
    );
};

