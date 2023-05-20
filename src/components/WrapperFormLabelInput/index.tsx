import classNames from 'classnames';
import { ReactNode } from 'react';

interface WrapperComLabelProps {
    label: string;
    children: ReactNode;
    cols: string;
    WrapperClassname?: string;
    errorMessage?: string;
    isObrigatorio?: boolean;
}

export function WrapperComLabel({ label, WrapperClassname, errorMessage, isObrigatorio = false, ...props }: WrapperComLabelProps) {
    function colClasseCss() {
        let classeCss = classesCss(props.cols ? props.cols : '12');

        return classeCss;
    }

    return (
        <div className={colClasseCss()}>
            <span style={{ marginBottom: '0.2rem', display: 'block' }}>
                {label}
                {isObrigatorio && (
                    <span style={{ marginLeft: '2px' }} className="p-error">
                        *
                    </span>
                )}
            </span>
            {props.children}
        </div>
    );
}

export default function classesCss(colunas: string) {
    const cols = colunas ? colunas.split(' ') : [];

    let classes = '';

    if (cols[0]) classes += ` col-${cols[0]}`;
    if (cols[1]) classes += ` md:col-${cols[1]}`;
    if (cols[2]) classes += ` lg:col-${cols[2]}`;
    if (cols[3]) classes += ` xl:col-${cols[3]}`;

    return classes;
}
