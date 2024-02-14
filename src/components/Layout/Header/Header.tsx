import { HeaderBurgerMenu } from "../../Common/HeaderBurgerMenu/HeaderBurgerMenu";
import { ThreadsMenu } from "../../Threads/Layout/ThreadsMenu/ThreadsMenu";
import { ColorSchemeToggle } from "../../Common/ColorSchemeToggle/ColorSchemeToggle";
import { UserMenu } from "../../User/UserMenu/UserMenu";
import { NavbarToggleIcon } from "../../Common/Icons/NavbarToggleIcon/NavbarToggleIcon";
import { Row } from "../../UI/Layout";
import { Size } from "../../../utils/uiUtils";
import { DesktopContainer, MobileContainer } from "../../UI/Layout";

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
        <Row justify="space-between">
            <Row gap={Size.xs}>
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
            </Row>
            <Row>
                <ColorSchemeToggle />
                <UserMenu />
            </Row>
        </Row>
    )
}