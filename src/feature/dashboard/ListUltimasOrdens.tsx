import React from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { OrdemServico } from '../../types/OrdemServico';
import { useGetUltimaOrdemServicoQuery } from '../ordemServico/OrdemServico.slice';
import { useNavigate } from 'react-router-dom';

export function ListUltimasOrdens() {
    const navigation = useNavigate();

    const { data: ultimasOrdemServico } = useGetUltimaOrdemServicoQuery()
    const responsiveOptions: CarouselResponsiveOption[] = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const footer = (ordemServicoId: number) => (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="ver ordem" onClick={() => navigation(`/app/cadastro/ordemServico/edit/${ordemServicoId}`)} />
        </div>
    );

    let ultimasOrdens = ultimasOrdemServico || []

    const productTemplate = (data: OrdemServico) => {
        let numeroStr = `N° da ordem ${data.ordemServicoNumero}`
        return (
            <div className='m-2'>
                <Card title={numeroStr} subTitle={data.ordemServicoDataAbertura} footer={() => footer(data.ordemServicoId)}  >
                    <p className="text-xl">{data.tipoServico.tipoServicoNome}</p>
                    <p className="text-2xl"> {data.ordemServicoValor.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}</p>
                </Card>
            </div>
        );
    };

    return (
        <div className=''>
            <h2>Ultimas ordens cadastradas</h2>
            <Carousel value={ultimasOrdens} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
    )
}
