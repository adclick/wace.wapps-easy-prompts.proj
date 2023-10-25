import { UserPromptOptions } from "@/model/UserPromptOptions"
import { useAuth0 } from "@auth0/auth0-react"
import { ActionIcon, Avatar, Button, Card, Center, Chip, Collapse, CopyButton, Group, Menu, Stack, Text, Tooltip, Transition, rem, useComputedColorScheme, useMantineTheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCheck, IconCopy, IconDetails, IconDeviceFloppy, IconDots, IconInfoCircle, IconMoodSad, IconMoodSmile, IconShare, IconThumbDown, IconThumbUp } from "@tabler/icons-react"
import classes from "./Request.module.css"
import cx from "clsx";

interface RequestParams {
    userPrompt: string,
    userPrmptOptions: UserPromptOptions,
    result: string
}

export interface Request {
    id: number
    userPrompt: string,
    userPromptOptions: UserPromptOptions
    result: any
}

export function Request({ userPrompt, userPrmptOptions, result }: RequestParams) {
    const { user } = useAuth0();
    const [opened, { toggle }] = useDisclosure(false);
    const theme = useMantineTheme();

    const computedColorScheme = useComputedColorScheme("dark");
    console.log(classes);

    return (
        <Stack gap={0}>
            <Card
                style={{ cursor: "pointer" }}
                onClick={toggle}
                radius={"0"}
                shadow="sm"
                py={"xl"}
                classNames={{
                    root: cx(classes["request-card"], classes[computedColorScheme])
                }}
            >
                <Group justify="space-between">
                    <Group>
                        <Avatar src={user?.picture} size={"sm"} />
                        <Text size="md">
                            {userPrompt}
                        </Text>
                    </Group>
                </Group>
                <Collapse in={opened}>
                    <Card.Section inheritPadding mt={"md"}>
                        <Group>
                            <Text size="xs">
                                {userPrmptOptions.getTechnologyName()} by {userPrmptOptions.getProviderName()}
                            </Text>
                        </Group>
                    </Card.Section>
                </Collapse>
            </Card>
            <Card shadow="sm" radius="0" py={"xl"}>
                <Group justify="space-between" wrap="nowrap" align="flex-start" gap={"xl"}>
                    <Group wrap="nowrap" align="flex-start" gap={"xl"}>
                        <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                        <Text size="md">
                            {result}
                        </Text>
                    </Group>
                    <Group gap={"xs"} wrap="nowrap">
                        <ActionIcon color='red' variant='subtle'>
                            <IconMoodSad size={"18"} />
                        </ActionIcon>
                        <ActionIcon variant='subtle'>
                            <IconMoodSmile size={"18"} />
                        </ActionIcon>
                        <CopyButton value={result} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                        {copied ? (
                                            <IconCheck size={18} />
                                        ) : (
                                            <IconCopy size={18} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>
                </Group>
            </Card>
        </Stack>
    )
}