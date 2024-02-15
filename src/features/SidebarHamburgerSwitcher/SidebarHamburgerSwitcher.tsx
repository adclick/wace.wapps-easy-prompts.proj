import { Burger } from "@mantine/core"
import { FC } from "react"

interface SidebarHamburgerSwitcherProps {
    navbarOpened: boolean,
    navbarHandle: any
}

const SidebarHamburgerSwitcher: FC<SidebarHamburgerSwitcherProps> = ({
    navbarOpened,
    navbarHandle
}: SidebarHamburgerSwitcherProps) => {
    return (
        <Burger
            opened={navbarOpened}
            onClick={navbarHandle.toggle}
            size="sm"
        />
    )
}

export default SidebarHamburgerSwitcher;