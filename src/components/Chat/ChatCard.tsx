import { useAuth0 } from "@auth0/auth0-react";
import { ActionIcon, Avatar, Badge, Box, Button, Card, Chip, Collapse, CopyButton, Divider, Group, Indicator, Loader, Menu, Paper, Popover, Stack, Text, Tooltip, em, rem, useComputedColorScheme } from "@mantine/core"
import { IconCheck, IconDownload, IconCopy, IconDeviceFloppy, IconDotsVertical, IconEye, IconFileZip, IconMoodSad, IconMoodSadFilled, IconMoodSmile, IconMoodSmileFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash } from "@tabler/icons-react"
import { Request } from "../../model/Request";
import { Response } from "../../model/Response";
import { useEffect, useState } from "react";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { UserPromptOptions } from "@/model/UserPromptOptions";
import { ChatCardText } from "./ChatCardText";
import { ChatCardImage } from "./ChatCardImage";
import { SelectedOptionsWidget } from "../Prompt/SelectedOptionsWidget";
import { IconQuestionMark } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Repository } from "../../model/Repository";
import { Language } from "../../model/Language";
import { User } from "../../model/User";
import { RepositoryNewPromptModal } from "../Repository/RepositoryNewPromptModal";
import { RepositoryItem } from "../../model/RepositoryItem";
import { notifications } from "@mantine/notifications";
import { ChatCardKeywordsExtracted } from "./ChatCardResponseKeywordsExtracted";

interface ChatCard {
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
    openRepositoryItemDetailsSelected: any
}

export function ChatCard({
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
    openRepositoryItemDetailsSelected
}: ChatCard) {
    const [result, setResult] = useState(<Loader size={"sm"} type="dots" />);
    const [responseAsText, setResponseAsText] = useState('');
    const [vote, setVote] = useState(0);
    const [responded, setResponded] = useState(false);
    const [savePromptModalOpened, savePromptModalHandle] = useDisclosure(false);

    // Once loaded, get the response from the user request
    useEffect(() => {
        // On each render, don't request if already responded
        if (responded) return;

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
                    aIMediatorClient.generateImage(optimizedPrompt, request.userPromptOptions).then((images: string[]) => {
                        setResult(<ChatCardImage images={images} />);
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
        
        setResponded(true);
        scrollIntoView({ alignment: 'start' });

    }, [scrollIntoView]);

    const savePrompt = async () => {
        const modifierId = request.repositoryItems.length > 0 ? request.repositoryItems[0].id : 0; 

        await aIMediatorClient.savePrompt(
            request.text,
            request.text,
            request.userPromptOptions.technology.slug,
            request.userPromptOptions.provider.slug,
            modifierId,
            user.id,
            repository.slug,
            language.code
        );

        notifications.show({
            title: 'Prompt Saved',
            message: 'Your settings were saved',
            color: RepositoryItem.getColor("prompt")
        });

        refreshPromptOptions();
    }

    const handleVote = (vote: number) => {
        setVote(vote);
    }

    const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

    return (
        <Card mx={isMobile ? "0" : "xl"} radius={isMobile ? "0" : "lg"} p={"md"} shadow="sm">
            <Stack gap={0}>
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
                    <Group gap={"xs"} wrap="nowrap">
                        {/* <Tooltip label="Good Response" withArrow>
                            <ActionIcon disabled variant='subtle' onClick={() => handleVote(1)}>
                                {
                                    vote > 0
                                        ? <IconMoodSmileFilled size={"16"} />
                                        : <IconMoodSmile size={"16"} />
                                }
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Bad Response" withArrow>
                            <ActionIcon disabled color='red' variant='subtle' onClick={() => handleVote(-1)}>
                                {
                                    vote < 0
                                        ? <IconMoodSadFilled size={"16"} />
                                        : <IconMoodSad size={"16"} />
                                }
                            </ActionIcon>
                        </Tooltip> */}
                        <Button leftSection={<IconDownload size={16} />} onClick={savePrompt} variant="subtle" size="xs" color={RepositoryItem.getColor("prompt")}>
                            Save Prompt
                        </Button>
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
                        <RepositoryNewPromptModal
                            opened={savePromptModalOpened}
                            close={savePromptModalHandle.close}
                            prompt={request.text}
                            technology={request.userPromptOptions.technology.slug}
                            provider={request.userPromptOptions.provider.slug}
                            aiMediatorClient={aIMediatorClient}
                            userId={user.id}
                            repository={repository.slug}
                            language={language.code}
                            refreshPromptOptions={refreshPromptOptions}

                        />

                        {/* <Menu withinPortal position="top" shadow="sm">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item onClick={savePromptModalHandle.open} leftSection={<IconPrompt style={{ width: rem(14), height: rem(14) }} />}>
                                    Save Prompt
                                </Menu.Item>
                                <Menu.Item disabled onClick={savePrompt} leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                                    Save Template
                                </Menu.Item>
                                <Menu.Item disabled onClick={savePrompt} leftSection={<IconSparkles style={{ width: rem(14), height: rem(14) }} />}>
                                    Save Modifiers
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu> */}
                    </Group>
                    <Group>
                        {
                            request.repositoryItems.length
                            &&
                            <ActionIcon
                                onClick={() => openRepositoryItemDetailsSelected(request.repositoryItems[0])}
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
                        }
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    )
}