import { Burger, Group } from "@mantine/core";
import { UserMenu } from "../UserMenu/UserMenu";
import { FeedbackButton } from "../FeedbackButton/FeedbackButton";

interface NavbarHeader {
    opened: boolean,
    toggle: any
}

export function NavbarHeader({ opened, toggle }: NavbarHeader) {
    return (
        <Group h={"100%"} px={"md"} justify='space-between'>
            <Burger
                opened={opened}
                onClick={toggle}
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