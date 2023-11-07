import { Badge, Box, Burger, Group, Title } from "@mantine/core";
import { FeedbackButton } from "../FeedbackButton/FeedbackButton";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { UserMenu } from "../UserMenu/UserMenu";

interface Header {
    opened: boolean,
    toggle: any
}

export function Header({ opened, toggle }: Header) {
    return (
        <Group h={"100%"} px={"md"} justify="space-between">
            <Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Title order={2}>
                    EasyPrompts
                </Title>
                <Badge size="xs">Beta</Badge>
            </Group>
            <Group>
                <Group visibleFrom='sm'>
                    <FeedbackButton />
                </Group>
                <ColorSchemeToggle />
                <Box visibleFrom='sm'>
                    <UserMenu />
                </Box>
            </Group>
        </Group>
    );
}