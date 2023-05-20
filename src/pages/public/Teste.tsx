import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from '../../components/ButtonComponent';
export function Teste(){
    const navigate = useNavigate();
    return (
        <>
            <h1> TESTEEE</h1>
            <ButtonComponent onClick={()=>navigate('/app/venda/lead')} label="Redirecionar"/>
        </>
    )
}