import { useAuth0 } from "@auth0/auth0-react";
import { ActionIcon, Avatar, Badge, Box, Button, Card, Chip, Collapse, CopyButton, Divider, Group, Indicator, Loader, Menu, Paper, Popover, Stack, Text, Tooltip, em, rem, useComputedColorScheme } from "@mantine/core"
import { IconCheck, IconDownload, IconCopy, IconDeviceFloppy, IconDotsVertical, IconEye, IconFileZip, IconMoodSad, IconMoodSadFilled, IconMoodSmile, IconMoodSmileFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash, IconThumbUp, IconX } from "@tabler/icons-react"
import { Request } from "../../../model/Request";
import { Response } from "../../../model/Response";
import { useEffect, useState } from "react";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ChatCardText } from "../ChatCardText";
import { ChatCardImage } from "../ChatCardImage";
import { SelectedOptionsWidget } from "../../Prompt/SelectedOptionsWidget";
import { IconQuestionMark } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Repository } from "../../../model/Repository";
import { Language } from "../../../model/Language";
import { User } from "../../../model/User";
import { RepositoryNewPromptModal } from "../../Layout/Modals/NewPromptModal/NewPromptModal";
import { RepositoryItem } from "../../../model/RepositoryItem";
import { notifications } from "@mantine/notifications";
import { ChatCardKeywordsExtracted } from "../ChatCardResponseKeywordsExtracted";
import { useFilters } from "../../../context/FiltersContext";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { ChatCardIntro } from "../ChatCardIntro";
import { Thread } from "../../../model/Thread";

interface ChatMessage {
    threads: Thread[],
    setThreads: any,
    thread: Thread,
    threadIndex: number,
    request: Request,
    response: Response,
    aIMediatorClient: AIMediatorClient,
    userPromptOptions: UserPromptOptions,
    setUserPromptOptions: any,
    refreshPromptOptions: any,
    scrollIntoView: any,
    user: User,
    repository: Repository,
    language: Language,
    openRepositoryItemDetailsSelected: any,
    refreshRepository: any,
    firstLogin: boolean,
    setFirstLogin: any,
    theme: string
}

export function ChatMessage({
    threads,
    setThreads,
    thread,
    threadIndex,
    request,
    response,
    aIMediatorClient,
    userPromptOptions,
    setUserPromptOptions,
    refreshPromptOptions,
    scrollIntoView,
    user,
    repository,
    language,
    openRepositoryItemDetailsSelected,
    refreshRepository,
    firstLogin,
    setFirstLogin,
    theme
}: ChatMessage) {
    const [result, setResult] = useState(<Loader size={"sm"} type="dots" />);
    const [responseAsText, setResponseAsText] = useState('');
    const [vote, setVote] = useState(0);
    const [responded, setResponded] = useState(false);
    const [savePromptModalOpened, savePromptModalHandle] = useDisclosure(false);
    const { selectedFilters } = useSelectedFilters();

    const confirmIntro = async () => {
        if (user !== undefined && "id" in user && user.id !== undefined) {
            setFirstLogin(false);
            deleteThread();
            aIMediatorClient.updateUser(user.id, selectedFilters.language, theme, false);
        }
    }

    const deleteThread = () => {
        setThreads(threads.filter((t, i) => i !== threadIndex));
    }

    // Once loaded, get the response from the user request
    useEffect(() => {
        // On each render, don't request if already responded
        if (responded) return;

        if (request.intro === true) {
            setResult(<ChatCardIntro
                firstLogin={firstLogin}
                setFirstLogin={setFirstLogin}
                aiMediatorClient={aIMediatorClient}
                theme={theme}
            />);
        } else {
            switch (request.userPromptOptions.technology.slug) {
                case 'text-generation':
                    aIMediatorClient.optimizePrompt(request.text, request.repositoryItems, userPromptOptions).then(optimizedPrompt => {
                        aIMediatorClient.generateText(optimizedPrompt, request.repositoryItems, request.userPromptOptions).then(text => {
                            setResult(<ChatCardText text={text} />);
                            setResponseAsText(text);
                        }).catch((e) => {
                            setResult(<Text>Error. Something went wrong. Contact support</Text>)
                        })
                    })
                    break;
                case 'image-generation':
                    aIMediatorClient.optimizePrompt(request.text, request.repositoryItems, userPromptOptions).then(optimizedPrompt => {
                        aIMediatorClient.generateImage(optimizedPrompt, request.userPromptOptions).then((response: string[]|string) => {
                            if (typeof response === 'string') {
                                setResult(<ChatCardText text={response} />);
                                } else {
                                setResult(<ChatCardImage images={response} />);
                            }
                            setResponseAsText('');
                        }).catch((e) => {
                            setResult(<Text>Error. Something went wrong. Contact support</Text>)
                        })
                    })
                    break;
                case 'keywords-extraction':
                    aIMediatorClient.extractKeywords(request.text, request.userPromptOptions).then((keywords: string[]) => {
                        setResult(<ChatCardKeywordsExtracted keywords={keywords} />);
                        setResponseAsText(keywords.join(','));
                    }).catch((e) => {
                        setResult(<Text>Error. Something went wrong. Contact support</Text>)
                    })
                    break;
                case 'translation':
                    aIMediatorClient.translate(request.text, request.userPromptOptions).then((text: string) => {
                        setResult(<ChatCardText text={text} />);
                        setResponseAsText(text);
                    }).catch((e) => {
                        setResult(<Text>Error. Something went wrong. Contact support</Text>)
                    })
                    break;
                default:
                    setResult(<Text>Error</Text>);
                    break;
            }
        }

        setResponded(true);
        scrollIntoView({ alignment: 'start' });

    }, [scrollIntoView]);

    const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

    return (
        <Card mx={isMobile ? "0" : "xl"} radius={isMobile ? "0" : "lg"} p={"md"} shadow="sm">
            <RepositoryNewPromptModal
                opened={savePromptModalOpened}
                handle={savePromptModalHandle}
                refreshRepository={refreshRepository}
                request={request}
                aIMediatorClient={aIMediatorClient}
            />
            <Stack gap={0}>
                {
                    request.intro === false &&
                    <Box py={"xs"}>
                        <Group justify="space-between">
                            <Group>
                                <Avatar src={user?.picture} size={"sm"} />
                                <Text size="md" style={{ whiteSpace: "pre-line" }}>
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
                }
                <Box py={"xl"} px={0}>
                    <Group justify="space-between" wrap="wrap" align="flex-start" gap={"xl"}>
                        <Group align="flex-start">
                            <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                            {result}
                        </Group>
                    </Group>
                </Box>
            </Stack>
            <Card.Section inheritPadding mt={"lg"} mb={0}>
                <Group justify="space-between" wrap="wrap">
                        {
                            request.intro ?
                                <Button
                                    onClick={confirmIntro}
                                    variant="subtle"
                                    size="xs"
                                    leftSection={<IconThumbUp style={{ width: rem(16), height: rem(16) }} />}
                                >
                                    Got it!
                                </Button>
                                :
                                <Group gap={"xs"} wrap="nowrap">
                                    <Tooltip label="Good Response" withArrow>
                                        <ActionIcon disabled variant='subtle'>
                                            {
                                                vote > 0
                                                    ? <IconMoodSmileFilled size={"16"} />
                                                    : <IconMoodSmile size={"16"} />
                                            }
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label="Bad Response" withArrow>
                                        <ActionIcon disabled color='red' variant='subtle'>
                                            {
                                                vote < 0
                                                    ? <IconMoodSadFilled size={"16"} />
                                                    : <IconMoodSad size={"16"} />
                                            }
                                        </ActionIcon>
                                    </Tooltip>
                                    <CopyButton value={responseAsText} timeout={2000}>
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
                                            <Menu.Item onClick={savePromptModalHandle.open} leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
                                                Save Prompt
                                            </Menu.Item>
                                            <Menu.Item color="red" onClick={deleteThread} leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                                Delete this card
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                        }

                    <Group>
                        {
                            request.repositoryItems.length
                            &&
                            <Popover position="top">
                                <Popover.Target>
                                    <ActionIcon
                                        variant="subtle"
                                        color={request.repositoryItems[0].color}
                                    >
                                        {
                                            request.repositoryItems[0].type === "prompt" && <IconPrompt size={16} />
                                        }
                                        {
                                            request.repositoryItems[0].type === "template" && <IconTemplate size={16} />
                                        }
                                        {
                                            request.repositoryItems[0].type === "modifier" && <IconSparkles size={16} />
                                        }
                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Text size="xs">{request.repositoryItems[0].name}</Text>
                                </Popover.Dropdown>
                            </Popover>
                        }
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}