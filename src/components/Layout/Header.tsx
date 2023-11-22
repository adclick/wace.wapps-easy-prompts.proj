import { Badge, Box, Burger, Group, Image, Title, em } from "@mantine/core";
import { FeedbackButton } from "../Elements/FeedbackButton";
import { ColorSchemeToggle } from "../Elements/ColorSchemeToggle";
import { UserMenu } from "../Elements/UserMenu";
import { useMediaQuery } from "@mantine/hooks";
import logo from "../../favicon.svg";

interface Header {
    navbarOpened: boolean,
    navbarToggle: any
}

export function Header({ navbarOpened, navbarToggle }: Header) {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return (
        <Group h={"100%"} px={"md"} justify="space-between" align="center">
            <Group>
                <Burger
                    opened={navbarOpened}
                    onClick={navbarToggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Title order={isMobile ? 3 : 2}>
                    EasyPrompts
                </Title>
                <Badge size="xs">Alpha</Badge>
            </Group>
            <Group>
                <Box visibleFrom='md'>
                    <FeedbackButton />
                </Box>
                <Box visibleFrom='sm'>
                    <ColorSchemeToggle />
                </Box>
                <UserMenu />
            </Group>
        </Group>
    );
}