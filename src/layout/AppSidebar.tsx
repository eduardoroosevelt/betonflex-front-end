import { AppMenu } from './AppMenu';
import { Bell } from 'phosphor-react';

const mock = [
    {
        label: 'Administrativo',
        icon: <Bell size={16} weight="bold" />,
        list: [
            {
                label: 'Cadastros',
                list: [{ label: 'Pessoas' }, { label: 'Materiais' }]
            },
            {
                label: 'Calendar'
            },
            {
                label: 'Chat'
            }
        ]
    },
    {
        label: 'Vendas',
        list: [{ label: 'Form' }, { label: 'Input' }]
    }
];

export const AppSidebar = () => {
    return <AppMenu />;
};
