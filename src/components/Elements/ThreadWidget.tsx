import { useAuth0 } from "@auth0/auth0-react";
import { ActionIcon, Avatar, Box, Card, Chip, Collapse, CopyButton, Divider, Group, Loader, Stack, Text, Tooltip, useComputedColorScheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconCopy, IconMoodSad, IconMoodSmile } from "@tabler/icons-react"
import cx from "clsx";
import classes from "./ThreadWidget.module.css"
import { Request } from "../../model/Request";
import { Response } from "../../model/Response";
import { useEffect, useState } from "react";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ThreadResponseTextWidget } from "./ThreadResponseTextWidget";
import { ThreadResponseImageWidget } from "./ThreadResponseImageWidget";
import { ThreadResponseAudioWidget } from "./ThreadResponseAudioWidget";

interface ThreadWidget {
    request: Request,
    response: Response,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions
}

export function ThreadWidget({ request, response, aIMediatorClient, userPromptOptions }: ThreadWidget) {
    const { user } = useAuth0();
    const [opened, { toggle }] = useDisclosure(false);
    const [result, setResult] = useState(<Loader type="dots" />);
    const computedColorScheme = useComputedColorScheme("dark");

    // Once loaded, get the response from the user request
    useEffect(() => {
        switch (userPromptOptions.technology.slug) {
            case 'text-generation':
                aIMediatorClient.generateText(request.text, userPromptOptions).then(text => {
                    setResult(<ThreadResponseTextWidget text={text} />);
                }).catch((e) => {
                    setResult(<Text>{e.message}</Text>)
                })
                break;
            case 'image-generation':
                aIMediatorClient.generateImage(request.text, userPromptOptions).then((images: string[]) => {
                    setResult(<ThreadResponseImageWidget images={images} />);
                }).catch((e) => {
                    setResult(<Text>{e.message}</Text>)
                })
                break;
            case 'audio-generation':
                aIMediatorClient.generateAudio(request.text, userPromptOptions).then((audio: string) => {
                    setResult(<ThreadResponseAudioWidget audio={audio} />);
                }).catch(e => {
                    setResult(<Text>{e.message}</Text>)
                });
                break;
            default:
                setResult(<Text>Error</Text>);
                break;
        }
    }, [])

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
                            {request.text}
                        </Text>
                    </Group>
                </Group>
                <Collapse in={opened}>
                    <Card.Section inheritPadding mt={"md"}>
                        <Group>
                            <Text size="xs">
                                {userPromptOptions.technology.name} | {userPromptOptions.provider.name}
                            </Text>
                        </Group>
                        {
                            userPromptOptions.modifiers.length > 0 &&
                            <Box>
                                <Divider my={"xs"} />
                                <Group>
                                    {
                                        userPromptOptions.modifiers.map(modifier => {
                                            return (
                                                <Chip key={modifier.slug} checked size="xs" variant="light" value={modifier.slug}>
                                                    {modifier.name}
                                                </Chip>
                                            )
                                        })
                                    }
                                </Group>
                            </Box>
                        }
                    </Card.Section>
                </Collapse>
            </Card>
            <Card shadow="sm" radius="0" py={"xl"}>
                <Group justify="space-between" wrap="wrap" align="flex-start" gap={"xl"}>
                    <Group wrap="nowrap" align="flex-start">
                        <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                        {result}
                    </Group>
                    <Group gap={"xs"} wrap="nowrap">
                        <ActionIcon color='red' variant='subtle'>
                            <IconMoodSad size={"18"} />
                        </ActionIcon>
                        <ActionIcon variant='subtle'>
                            <IconMoodSmile size={"18"} />
                        </ActionIcon>
                        <CopyButton value={response.data} timeout={2000}>
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