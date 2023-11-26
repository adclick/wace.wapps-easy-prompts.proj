import { useAuth0 } from "@auth0/auth0-react";
import { ActionIcon, Avatar, Badge, Box, Button, Card, Chip, Collapse, CopyButton, Divider, Group, Indicator, Loader, Menu, Paper, Popover, Stack, Text, Tooltip, rem, useComputedColorScheme } from "@mantine/core"
import { IconCheck, IconCopy, IconDeviceFloppy, IconDotsVertical, IconEye, IconFileZip, IconMoodSad, IconMoodSadFilled, IconMoodSmile, IconMoodSmileFilled, IconShare, IconSparkles, IconTrash } from "@tabler/icons-react"
import { Request } from "../../model/Request";
import { Response } from "../../model/Response";
import { useEffect, useState } from "react";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ChatCardText } from "./ChatCardText";
import { ChatCardImage } from "./ChatCardImage";
import { SelectedOptionsWidget } from "../Prompt/SelectedOptionsWidget";
import { IconQuestionMark } from "@tabler/icons-react";

interface ChatCard {
    request: Request,
    response: Response,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any,
    scrollIntoView: any
}

export function ChatCard({
    request,
    response,
    aIMediatorClient,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions,
    scrollIntoView
}: ChatCard) {
    const { user } = useAuth0();
    const [result, setResult] = useState(<Loader size={"sm"} type="dots" />);
    const [vote, setVote] = useState(0);

    // Once loaded, get the response from the user request
    useEffect(() => {
        aIMediatorClient.optimizePrompt(request.text, userPromptOptions).then(optimizedPrompt => {
            switch (userPromptOptions.technology.slug) {
                case 'text-generation':
                    aIMediatorClient.generateText(optimizedPrompt, userPromptOptions).then(text => {
                        setResult(<ChatCardText text={text} />);
                        scrollIntoView({ alignment: 'start' });
                    }).catch((e) => {
                        setResult(<Text>{e.message}</Text>)
                    })
                    break;
                case 'image-generation':
                    aIMediatorClient.generateImage(optimizedPrompt, userPromptOptions).then((images: string[]) => {
                        setResult(<ChatCardImage images={images} />);
                        scrollIntoView({ alignment: 'start' });
                    }).catch((e) => {
                        setResult(<Text>{e.message}</Text>)
                    })
                    break;
                default:
                    setResult(<Text>Error</Text>);
                    break;
            }
        })
    }, [scrollIntoView]);

    const savePrompt = async () => {
        await aIMediatorClient.upvotePrompt(
            request.text,
            userPromptOptions.technology,
            userPromptOptions.provider
        );

        await refreshPromptOptions();
    }

    const handleVote = (vote: number) => {
        setVote(vote);
    }

    return (
        <Card mx={"xl"} p={"md"} shadow="sm">
            <Stack gap={0}>
                <Box
                    style={{ cursor: "pointer" }}
                    px={0}
                    py={"xs"}
                >
                    <Group justify="space-between">
                        <Group>
                            <Avatar src={user?.picture} size={"sm"} />
                            <Text size="md">
                                {request.text}
                            </Text>
                        </Group>
                        <Group>
                            <SelectedOptionsWidget
                                technology={request.userPromptOptions.technology}
                                provider={request.userPromptOptions.provider}
                                parameters={request.userPromptOptions.parameters}
                                modifiers={request.userPromptOptions.modifiers}
                            />
                        </Group>
                    </Group>
                </Box>
                <Box
                    py={"xl"}
                    px={0}
                >
                    <Group justify="space-between" wrap="wrap" align="flex-start" gap={"xl"}>
                        <Group wrap="nowrap" align="flex-start">
                            <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                            {result}
                        </Group>

                    </Group>
                </Box>
            </Stack>
            <Card.Section inheritPadding mt={"lg"} mb={0}>
                <Group justify="space-between" wrap="wrap">
                    <Group gap={"xs"} wrap="nowrap">
                        <Tooltip label="Good Response" withArrow>
                            <ActionIcon variant='subtle' onClick={() => handleVote(1)}>
                                {
                                    vote > 0
                                        ? <IconMoodSmileFilled size={"16"} />
                                        : <IconMoodSmile size={"16"} />
                                }

                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Bad Response" withArrow>
                            <ActionIcon color='red' variant='subtle' onClick={() => handleVote(-1)}>
                                {
                                    vote < 0
                                        ? <IconMoodSadFilled size={"16"} />
                                        : <IconMoodSad size={"16"} />
                                }
                            </ActionIcon>
                        </Tooltip>
                        <CopyButton value={response.data} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
                                    <ActionIcon color={copied ? 'blue' : 'gray'} variant="subtle" onClick={copy}>
                                        {copied ? (
                                            <IconCheck size={16} />
                                        ) : (
                                            <IconCopy size={16} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                        <Menu withinPortal position="top" shadow="sm">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item onClick={savePrompt} leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />}>
                                    Save Prompt
                                </Menu.Item>
                                <Menu.Item onClick={savePrompt} leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />}>
                                    Save Template
                                </Menu.Item>
                                <Menu.Item leftSection={<IconShare style={{ width: rem(14), height: rem(14) }} />}>
                                    Share
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                    color="red"
                                >
                                    Remove
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    <Group>
                        {
                            request.userPromptOptions.modifiers.length
                            && <Popover>
                                <Popover.Target>
                                    <Indicator zIndex={100} size={16} label={request.userPromptOptions.modifiers.length}>
                                        <ActionIcon variant="subtle">
                                            <IconSparkles />
                                        </ActionIcon>
                                    </Indicator>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    {
                                        request.userPromptOptions.modifiers.map(m => {
                                            return (
                                                <Group justify="space-between">
                                                    <Chip size="xs" variant="outline" readOnly checked value={m.slug}>{m.name}</Chip>
                                                    <Popover width={200} position="top" withArrow shadow="md">
                                                        <Popover.Target>
                                                            <ActionIcon mx={"sm"} size={'sm'} variant="outline" aria-label="Settings">
                                                                <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                                            </ActionIcon>
                                                        </Popover.Target>
                                                        <Popover.Dropdown>
                                                            <Text size="xs">
                                                                {m.description}
                                                            </Text>
                                                        </Popover.Dropdown>
                                                    </Popover>

                                                </Group>
                                            )
                                        })
                                    }
                                </Popover.Dropdown>
                            </Popover>
                        }
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}