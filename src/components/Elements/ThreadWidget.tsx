import { useAuth0 } from "@auth0/auth0-react";
import { ActionIcon, Avatar, Box, Button, Card, Chip, Collapse, CopyButton, Divider, Group, Loader, Stack, Text, Tooltip, rem, useComputedColorScheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconCopy, IconDeviceFloppy, IconMoodSad, IconMoodSmile } from "@tabler/icons-react"
import { Request } from "../../model/Request";
import { Response } from "../../model/Response";
import { useEffect, useState } from "react";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ThreadResponseTextWidget } from "./ThreadResponseTextWidget";
import { ThreadResponseImageWidget } from "./ThreadResponseImageWidget";
import { Language } from "../../model/Language";

interface ThreadWidget {
    request: Request,
    response: Response,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any
}

export function ThreadWidget({
    request,
    response,
    aIMediatorClient,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions
}: ThreadWidget) {
    const { user } = useAuth0();
    const [opened, { toggle }] = useDisclosure(false);
    const [result, setResult] = useState(<Loader type="dots" />);

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
            default:
                setResult(<Text>Error</Text>);
                break;
        }
    }, []);

    const savePrompt = async () => {
        await aIMediatorClient.upvotePrompt(
            request.text,
            userPromptOptions.technology,
            userPromptOptions.provider
        );

        await refreshPromptOptions();
    }

    return (
        <Card mx={"xl"} p={"md"}>
            <Stack gap={0}>
                <Card
                    style={{ cursor: "pointer" }}
                    onClick={toggle}
                    radius={"0"}
                    px={0}
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
                <Card
                    radius="0"
                    py={"xl"}
                    px={0}
                >
                    <Group justify="space-between" wrap="wrap" align="flex-start" gap={"xl"}>
                        <Group wrap="nowrap" align="flex-start">
                            <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                            {result}
                        </Group>

                    </Group>
                </Card>
            </Stack>
            <Card.Section inheritPadding py={"xs"}>
                <Group justify="space-between">

                    <Group gap={"xs"} wrap="nowrap">
                        <ActionIcon variant='subtle'>
                            <IconMoodSmile size={"18"} />
                        </ActionIcon>
                        <ActionIcon color='red' variant='subtle'>
                            <IconMoodSad size={"18"} />
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
                    <Group>
                        <Button
                            onClick={savePrompt}
                            leftSection={<IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} />}
                            variant="transparent"
                        >Save
                        </Button>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}