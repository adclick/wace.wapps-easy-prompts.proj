import { Burger, Group } from "@mantine/core";
import { UserMenu } from "../Elements/UserMenu";
import { FeedbackButton } from "../Elements/FeedbackButton";
import { ColorSchemeToggle } from "../Elements/ColorSchemeToggle";

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
                <FeedbackButton />
                <UserMenu />
            </Group>
        </Group>
    )
}