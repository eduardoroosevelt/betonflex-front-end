import menu from '../config/menu';
import { AppMenuitem } from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const model = menu;

export const AppMenu = () => {
    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return <AppMenuitem item={item} root={true} index={i} key={item.label} />;
                })}
            </ul>
        </MenuProvider>
    );
};
