import { useAuth0 } from "@auth0/auth0-react";
import { ActionIcon, Avatar, Box, Button, Card, Chip, Collapse, CopyButton, Divider, Group, Loader, Paper, Stack, Text, Tooltip, rem, useComputedColorScheme } from "@mantine/core"
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
    const [result, setResult] = useState(<Loader size={"sm"} type="dots" />);

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
        <Card mx={"xl"} p={"md"} shadow="sm">
            <Stack gap={0}>
                <Box
                    style={{ cursor: "pointer" }}
                    px={0}
                    py={"xs"}
                >
                    <Group>
                        <Avatar src={user?.picture} size={"sm"} />
                        <Text size="md">
                            {request.text}
                        </Text>
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
                            <ActionIcon variant='subtle'>
                                <IconMoodSmile size={"18"} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Bad Response" withArrow>
                            <ActionIcon color='red' variant='subtle'>
                                <IconMoodSad size={"18"} />
                            </ActionIcon>
                        </Tooltip>
                        <CopyButton value={response.data} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
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
                        <Button
                            onClick={savePrompt}
                            leftSection={<IconDeviceFloppy style={{ width: rem(18), height: rem(18) }} />}
                            variant="subtle"
                            size="compact-sm"
                        >Save
                        </Button>
                    </Group>
                    <Group>
                        <Text size="xs" fw={700}>
                            {userPromptOptions.technology.name} | {userPromptOptions.provider.name}
                        </Text>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}