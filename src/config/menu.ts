
const menu = () => {
    var retorno = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: './' }]
        },
        {
            label: 'Cadastros',
            items: [
                { label: 'Cliente', icon: 'pi pi-fw pi-user', to: 'cadastro/cliente' },
                { label: 'Tipo de Serviço', icon: 'pi pi-fw pi-user', to: 'cadastro/tipo-servico' },
                { label: 'Almoxarifado  ', icon: 'pi pi-fw pi-id-card', to: 'cadastro/almoxarifado' },
                { label: 'Materiais', icon: 'pi pi-fw pi-id-card', to: 'cadastro/material' },
                { label: 'Ordem de Serviço', icon: 'pi pi-fw pi-id-card', to: 'cadastro/ordemServico' }
            ]
        },

    ]
    return retorno
}

export default menu();