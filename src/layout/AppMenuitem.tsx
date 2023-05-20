import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Ripple } from 'primereact/ripple';
import './AppMenuItem.css';
import { MenuContext } from './context/menucontext';
import { LayoutContext } from './context/layoutcontext';

interface ItemProps {
    label: string;
    to?: string;
    icon?: string;
    iconComponent?: JSX.Element;
    url?: string;
    visible?: boolean;
    class?: string;
    target?: string;
    items?: ItemProps[];
    command?: ({ originalEvent, item }: { originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>; item: ItemProps }) => void;
}

interface AppMenuitemProps {
    parentKey?: string;
    index: number;
    root?: boolean;
    item: ItemProps;
    className?: any;
}

export const AppMenuitem = ({ item, ...props }: AppMenuitemProps) => {
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const { onMenuToggle, isDesktop } = useContext(LayoutContext);
    let location = useLocation();

    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isActiveRoute = item.to && location.pathname === item.to;
    const active = activeMenu === key || activeMenu.startsWith(key + '-');

    const logh = {
        key,
        active,
        isActiveRoute
    };

    useEffect(() => {
        if (item.to && location.pathname === item.to) {
            setActiveMenu(key);
        }
    }, []);

    const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        //avoid processing disabled items
        // if (item.disabled) {
        //     event.preventDefault();
        //     return;
        // }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // toggle active state
        if (item.items) setActiveMenu(active ? props.parentKey! : key);
        else setActiveMenu(key);
        if (!isDesktop) {
            onMenuToggle()
        }
    };

    const subMenu = item.items && (
        <CSSTransition classNames="layout-submenu" timeout={300} in={props.root ? true : active} key={item.label} unmountOnExit>
            <ul>
                {item.items.map((child, i) => {
                    return <AppMenuitem item={child} index={i} key={child.label} parentKey={key} />;
                })}
            </ul>
        </CSSTransition>
    );

    return (
        <li className={classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': active })}>
            {props.root && item.visible !== false && <div className="layout-menuitem-root-text">{item.label}</div>}

            {(!item.to || item.items) && item.visible !== false ? (
                <a href={item.url} onClick={(e) => itemClick(e)} className={classNames(item.class, 'p-ripple', 'layout-menu-url')} target={item.target}>
                    <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                    {item.iconComponent && item.iconComponent}
                    <span className="layout-menuitem-text">{item.label}</span>

                    {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <Ripple />
                </a>
            ) : null}

            {item.to && !item.items ? (
                <Link to={item.to}>
                    <a onClick={(e) => itemClick(e)} className={classNames(item.class, 'p-ripple', { 'active-route': isActiveRoute })}>
                        <i className={classNames('layout-menuitem-icon', item.icon)}></i>
                        <span className="layout-menuitem-text">{item.label}</span>
                        {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    </a>
                </Link>
            ) : null}

            {subMenu}
        </li>
    );
};


