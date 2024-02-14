import { HeaderBurgerMenu } from "../../Common/HeaderBurgerMenu/HeaderBurgerMenu";
import { ThreadsMenu } from "../../Threads/Layout/ThreadsMenu/ThreadsMenu";
import { ColorSchemeToggle } from "../../Common/ColorSchemeToggle/ColorSchemeToggle";
import { UserMenu } from "../../User/UserMenu/UserMenu";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";
import { FlexRow } from "../../UI/Layout";
import { DesktopContainer, MobileContainer } from "../../UI/Layout";
import { FlexJustify, Size } from "../../../enums";
import FlexAlign from "../../../enums/FlexAlign";

interface Header {
    navbarMobileOpened: boolean,
    navbarDesktopOpened: boolean,
    navbarMobileHandle: any,
    navbarDesktopHandle: any,
}

export function Header({
    navbarMobileOpened,
    navbarDesktopOpened,
    navbarMobileHandle,
    navbarDesktopHandle,
}: Header) {
    return (
        <FlexRow justify={FlexJustify.spaceBetween} align={FlexAlign.center}>
            <FlexRow gap={Size.xs}>
                {
                    !navbarDesktopOpened &&
                    <DesktopContainer>
                        <NavbarToggleIcon
                            navbarOpened={navbarDesktopOpened}
                            navbarToggle={navbarDesktopHandle.toggle}
                        />
                    </DesktopContainer>
                }
                <MobileContainer>
                    <HeaderBurgerMenu
                        navbarOpened={navbarMobileOpened}
                        navbarHandle={navbarMobileHandle}
                    />
                </MobileContainer>

                <ThreadsMenu />
            </FlexRow>
            <FlexRow>
                <ColorSchemeToggle />
                <UserMenu />
            </FlexRow>
        </FlexRow>
    )
}