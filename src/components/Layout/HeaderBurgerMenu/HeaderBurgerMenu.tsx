import { Burger } from "@mantine/core"

interface HeaderBurgerMenu {
    navbarOpened: boolean,
    navbarHandle: any
}

export function HeaderBurgerMenu({navbarOpened, navbarHandle}: HeaderBurgerMenu) {
    return (
        <Burger
            opened={navbarOpened}
            onClick={navbarHandle.toggle}
            hiddenFrom="sm"
            size="sm"
        />
    )
}