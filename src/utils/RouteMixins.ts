import { ReactNode } from "react";

interface RouteProps{
    nameRef:string,
    label?: string,
    url: string,
    component : ReactNode,
    permissionKeys :string[],
}

export function Route(props:RouteProps){

    return {
        nameRef:props.nameRef,
        label: props.label,
        to: props.url,
        component: props.component,
        permissionKeys: Array.isArray(props.permissionKeys) && props.permissionKeys.length > 0 ? props.permissionKeys : null,
    }
}