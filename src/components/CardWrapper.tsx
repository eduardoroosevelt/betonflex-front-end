import gridCss from '../utils/Grid';
import { Card } from 'primereact/card';
import { ReactNode } from 'react';

interface CardWrapperProps {
    cols?: string
    title?: string
    handleVoltar?: () => void
    legenda?: () => ReactNode
    cardHeaderClassNames?: string
    children: ReactNode
}

const CardWrapper = (props: CardWrapperProps) => {

    function colClasseCss() {
        // Carrega a Grid Css
        let classeCss = gridCss(props.cols ? props.cols : '12')
        // Retorna as classes CSS customizadas
        return classeCss
    }

    function title() {
        if (props.title) {
            return (
                <div className="col-12">

                    {props.handleVoltar ?
                        <div className="grid" style={{ cursor: 'pointer', alignItems: 'center' }} onClick={props.handleVoltar}>
                            <div className="col-12 md:col-6 lg:col-4 p-xl-4  ">
                                <div style={{ display: 'flex' }}>
                                    <i
                                        className="pi pi-angle-left"
                                        style={{ fontSize: '2rem', margin: '1.5rem 0 1rem 0' }}
                                    />
                                    <h5 style={{ flex: 1 }}>
                                        <strong>{props.title}</strong>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                {props.legenda && props.legenda()}
                            </div>
                        </div>
                        :
                        <h5 >
                            <strong>{props.title}</strong>
                            {props.legenda && props.legenda()}
                        </h5>
                    }

                    <hr />
                </div>
            );
        } else {
            return (<></>)
        }
    }

    return (
        <div className={colClasseCss()}>
            <Card className={props.cardHeaderClassNames}>
                <div className="grid">
                    {title()}
                    {props.children}
                </div>
            </Card>
        </div>
    );
}

export default CardWrapper;
