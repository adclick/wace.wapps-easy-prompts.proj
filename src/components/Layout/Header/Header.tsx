import { DesktopContainer, FlexRow, MobileContainer } from "../../UI/Layout";
import { FlexAlign, FlexJustify, Size } from "../../../enums";
import { AppMenu, ColorThemeSwitcher, SidebarCollapseSwitcher, SidebarHamburgerSwitcher, UserMenu } from "../../../features";
import { BooleanHandle } from "../../../types";
import { FC } from "react";

interface HeaderProps {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: BooleanHandle,
    navbarDesktopHandle: BooleanHandle,
}

const Header: FC<HeaderProps> = ({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: HeaderProps) => {
    return (
        <FlexRow justify={FlexJustify.spaceBetween} align={FlexAlign.center}>
            <FlexRow gap={Size.xs}>
                {
                    !navbarDesktopOpened &&
                    <DesktopContainer>
                        <SidebarCollapseSwitcher
                            navbarOpened={navbarDesktopOpened}
                            navbarToggle={navbarDesktopHandle.toggle}
                        />
                    </DesktopContainer>
                }
                <MobileContainer>
                    <SidebarHamburgerSwitcher
                        navbarOpened={navbarMobileOpened}
                        navbarHandle={navbarMobileHandle}
                    />
                </MobileContainer>
                <AppMenu />
            </FlexRow>
            <FlexRow>
                <ColorThemeSwitcher />
                <UserMenu />
            </FlexRow>
        </FlexRow>
    )
}

export default Header;