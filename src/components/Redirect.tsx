import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Redirect({ url = '/app' }: { url?: string }) {
    const navigate = useNavigate();
    useEffect(() => {
        console.log('redirect');
        navigate(url)
    }, [])
    return <></>;
}