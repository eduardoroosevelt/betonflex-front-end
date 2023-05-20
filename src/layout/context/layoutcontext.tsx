import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

export const LayoutContext = createContext<{
    layoutConfig: ILayoutConfig;
    setLayoutConfig: Dispatch<SetStateAction<ILayoutConfig>>;
    layoutState: IlayoutState;
    setLayoutState: Dispatch<SetStateAction<IlayoutState>>;
    onMenuToggle: () => void;
    showProfileSidebar: () => void;
    isDesktop: boolean;
}>({
    layoutConfig: {
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    },
    layoutState: {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    },
    showProfileSidebar: () => {},
    onMenuToggle: () => {},
    setLayoutState: () => {},
    setLayoutConfig: () => {},
    isDesktop: true
});

interface LayoutProviderProps {
    children: ReactNode;
}

interface ILayoutConfig {
    ripple: boolean;
    inputStyle: string;
    menuMode: string;
    colorScheme: string;
    theme: string;
    scale: number;
}

interface IlayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

export const LayoutProvider = (props: LayoutProviderProps) => {
    const [layoutConfig, setLayoutConfig] = useState<ILayoutConfig>({
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });

    const [layoutState, setLayoutState] = useState<IlayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
        changeTheme();
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar,
        isDesktop: isDesktop()
    };

    const changeTheme = () => {
        // 'lara-dark-teal'
        // 'dark'
        setLayoutConfig((prevState) => ({ ...prevState, theme: 'lara-light-teal', colorScheme: 'light' }));
    };

    return <LayoutContext.Provider value={value}>{props.children} </LayoutContext.Provider>;
};
