import { Badge, Box, Burger, Group, Title } from "@mantine/core";
import { FeedbackButton } from "../Elements/FeedbackButton";
import { ColorSchemeToggle } from "../Elements/ColorSchemeToggle";
import { UserMenu } from "../Elements/UserMenu";

interface Header {
    navbarOpened: boolean,
    navbarToggle: any
}

export function Header({ navbarOpened, navbarToggle }: Header) {
    return (
        <Group h={"100%"} px={"md"} justify="space-between">
            <Group>
                <Burger
                    opened={navbarOpened}
                    onClick={navbarToggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Title order={2}>
                    EasyPrompts
                </Title>
                <Badge size="xs">Alpha</Badge>
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