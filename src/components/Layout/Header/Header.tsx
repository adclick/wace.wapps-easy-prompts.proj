import { Group } from "@mantine/core";
import { HeaderBurgerMenu } from "../HeaderBurgerMenu/HeaderBurgerMenu";
import { ThreadsMenu } from "../../Threads/ThreadsMenu/ThreadsMenu";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { UserMenu } from "../../User/UserMenu/UserMenu";

interface Header {
    navbarOpened: boolean,
    navbarHandle: any
}

export function Header({navbarOpened, navbarHandle}: Header) {
    return (
        <Group h={"100%"} justify="space-between" align="center">
            <Group align="center" gap={"xs"}>
                <HeaderBurgerMenu navbarOpened={navbarOpened} navbarHandle={navbarHandle} />
                <ThreadsMenu />
            </Group>
            <Group>
                <ColorSchemeToggle />
                <UserMenu />
            </Group>
        </Group>
    )
}