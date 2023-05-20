import { ReactNode, useContext, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';

import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';
import { LayoutContext } from './context/layoutcontext';
import { AppFooter } from './AppFooter';

export const AppLayout = () => {
    const { innerWidth: width } = window;
    const [menuBarIsOpened, setMenuBarIsOpened] = useState(width > 768);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);

    const { layoutConfig, layoutState, setLayoutState, onMenuToggle } = useContext(LayoutContext);

    function handleMenuBarIsOpened() {
        setMenuBarIsOpened(!menuBarIsOpened);
    }

    const containerClass = classNames('layout-wrapper', {
        'layout-theme-light': layoutConfig.colorScheme === 'light',
        'layout-theme-dark': layoutConfig.colorScheme === 'dark',
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple
    });

    return (
        <div className={containerClass}>
            <AppTopbar ref={topbarRef} />

            <div ref={sidebarRef} className="layout-sidebar">
                <AppSidebar />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">
                    {' '}
                    <Outlet />
                    <AppFooter />
                </div>
            </div>
            <div className="layout-mask" onClick={onMenuToggle}></div>
        </div>
    );
};
