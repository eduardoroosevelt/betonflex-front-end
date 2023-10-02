import { Button, ButtonProps } from 'primereact/button'


export function ButtonPrimary(props: ButtonProps) {
    return <Button {...props} severity='success' />
}

export function ButtonSecondary(props: ButtonProps) {
    return <Button {...props} severity='secondary' />
}

export function ButtonAdicionar({ onClick, loading, type = "submit" }: ButtonProps) {
    return (
        <>
            <Button
                label="Adicionar"
                icon="pi pi-plus"
                iconPos="left"
                onClick={onClick}
                loading={loading}
                type={type}
            />
        </>
    )
}

export function ButtonSalvar({ onClick, loading, type = "submit", severity = "info" }: ButtonProps) {
    return (
        <>
            <ButtonPrimary
                label="Salvar"
                icon="pi pi-check"
                iconPos="left"
                onClick={onClick}
                loading={loading}
                type={type}
            />
        </>
    )
}

export function ButtonProximo({ onClick, loading, type = "button", label = 'Próximo' }: ButtonProps) {
    return (
        <>
            <Button
                label={label}
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={onClick}
                loading={loading}
                type={type}
            />
        </>
    )
}

export function ButtonVoltar({ onClick }: ButtonProps) {
    return (
        <>
            <ButtonSecondary
                type="button"
                label="Voltar"
                icon="pi pi-arrow-left"
                iconPos="left"
                onClick={onClick}
            />
        </>
    )
}

export function ButtonConsultar({ onClick, type = "submit" }: ButtonProps) {
    return (
        <>
            <Button
                label="Consultar"
                icon="pi pi-search"
                type={type}
                iconPos="left"
                onClick={onClick}
            />
        </>
    )
}

export function ButtonIcon({ onClick, type, tooltip, tooltipOptions = { position: "top" }, icon, severity }: ButtonProps) {
    return (
        <>
            <Button
                type={type}
                tooltip={tooltip}
                tooltipOptions={{ ...tooltipOptions, appendTo: 'self' }}
                icon={icon}
                onClick={onClick}
                severity={severity}

            />
        </>
    )
}

export function ButtonIconLabel({ onClick, loading, type = "button", label = 'Próximo', icon = "pi pi-ban", iconPos = "right", severity = "danger" }: ButtonProps) {
    return (
        <>
            <Button
                label={label}
                icon={icon}
                iconPos={iconPos}
                onClick={onClick}
                loading={loading}
                type={type}
                severity={severity}
                text
                raised
            />
        </>
    )
}

