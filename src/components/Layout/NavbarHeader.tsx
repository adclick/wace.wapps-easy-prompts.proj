import { Burger, Group } from "@mantine/core";
import { FeedbackButton } from "../Misc/FeedbackButton";
import { ColorSchemeToggle } from "../Misc/ColorSchemeToggle";
import { UserMenu } from "../Misc/UserMenu";

interface NavbarHeader {
    navbarOpened: boolean,
    navbarToggle: any
}

export function NavbarHeader({ navbarOpened, navbarToggle }: NavbarHeader) {
    return (
        <Group h={"100%"} px={"md"} justify='space-between'>
            <Burger
                opened={navbarOpened}
                onClick={navbarToggle}
                hiddenFrom="sm"
                size="sm"
            />
            <Group hiddenFrom='sm'>
                {/* <FeedbackButton /> */}
                <UserMenu />
            </Group>
        </Group>
    )
}