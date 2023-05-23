import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

interface KeycloakProviderProps {
    children: React.ReactNode;
}
export default function KeycloakProvider({ children }: KeycloakProviderProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('KeycloakProvider -> renderizou');

    }, [dispatch])
    return (
        <>
            {children}
        </>
    )
}
