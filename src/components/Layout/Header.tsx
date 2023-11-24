import { Badge, Box, Burger, Button, Group, Image, Stack, Text, Title, em } from "@mantine/core";
import { FeedbackButton } from "../Misc/FeedbackButton";
import { ColorSchemeToggle } from "../Misc/ColorSchemeToggle";
import { UserMenu } from "../Misc/UserMenu";
import { useMediaQuery } from "@mantine/hooks";
import logo from "../../favicon.svg";
import { Provider } from "../../model/Provider";
import { Technology } from "../../model/Technology";
import { SelectedOptionsWidget } from "../Options/SelectedOptionsWidget";
import { Parameter } from "../../model/Parameter";
import { Modifier } from "../../model/Modifier";
import { ChatNewButton } from "../Chat/ChatNewButton";

interface Header {
    navbarOpened: boolean,
    navbarToggle: any,
    technology: Technology,
    provider: Provider,
    parameters: Parameter[],
    modifiers: Modifier[],
    resetChat: any
}

export function Header({
    navbarOpened,
    navbarToggle,
    technology,
    provider,
    parameters,
    modifiers,
    resetChat
}: Header) {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return (
        <Group h={"100%"} justify="space-between" align="center">

            <Stack>
                <Group align="center" gap={"xs"}>
                    <Burger
                        opened={navbarOpened}
                        onClick={navbarToggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Stack gap={"xs"}>
                        <Title order={isMobile ? 3 : 2}>
                            {technology.name}
                        </Title>
                        <Text size="xs">by {provider.name}</Text>
                    </Stack>

                </Group>

            </Stack>
            {/* <ColorSchemeToggle /> */}
            {/* <ChatNewButton resetChat={resetChat} /> */}
            <Box visibleFrom="sm">
                <UserMenu />
            </Box>
        </Group>
    );
}