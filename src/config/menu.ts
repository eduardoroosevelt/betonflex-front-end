
const menu = () => {
    var retorno = [
        // {
        //     label: 'Home',
        //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: './' }]
        // },
        {
            label: 'Cadastros',
            items: [
                { label: 'Cliente', icon: 'pi pi-fw pi-user', to: 'cadastro/cliente' },
                { label: 'Funcionário', icon: 'pi pi-fw pi-user', to: 'cadastro/funcionario' },
                { label: 'Tipo de Serviço', icon: 'pi pi-fw pi-user', to: 'cadastro/tipo-servico' },
                { label: 'Materiais', icon: 'pi pi-fw pi-id-card', to: 'cadastro/material' },
                { label: 'Almoxarifado  ', icon: 'pi pi-fw pi-id-card', to: 'cadastro/almoxarifado' },
                { label: 'Ordem de Serviço', icon: 'pi pi-fw pi-id-card', to: 'cadastro/ordemServico' }
            ]
        },

    ]
    return retorno
}

export default menu();