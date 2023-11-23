import { Badge, Box, Burger, Button, Group, Image, Text, Title, em } from "@mantine/core";
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
            <Group align="baseline">
                <Group align="center">
                    <Image src={logo} h={30} />
                    <Title order={isMobile ? 2 : 1}>Chat</Title>
                </Group>
                <Button onClick={resetChat} variant="transparent" size="compact-xs">
                    Clear
                </Button>
                {/* <SelectedOptionsWidget
                    technology={technology}
                    provider={provider}
                    parameters={parameters}
                    modifiers={modifiers}
                /> */}
            </Group>
            {/* <Group>
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
            </Group> */}
            <Group>
                {/* <Box visibleFrom='md'>
                    <FeedbackButton />
                </Box> */}
                <ChatNewButton resetChat={resetChat} />
                <Box visibleFrom='sm'>
                    <ColorSchemeToggle />
                </Box>
                {/* <UserMenu /> */}
            </Group>
        </Group>
    );
}