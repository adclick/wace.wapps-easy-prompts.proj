import { Accordion, ActionIcon, Badge, Group, Stack, Text, Menu, Modal } from "@mantine/core";
import { IconCopy, IconDotsVertical, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { Prompt } from "../../../../models/Prompt";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { PromptCardDetails } from "../PromptCardDetails/PromptCardDetails";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { PromptRequest, PromptRequestType } from "../../../../models/PromptRequest";
import { iconPlay } from "../../../../utils/iconsUtils";
import { useDeletePromptMutation, usePromptQuery } from "../../../../api/promptsApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { getDefaultProvider } from "../../../../api/providersApi";
import { DatabaseCardContent } from "../../Common/DatabaseCardContent/DatabaseCardContent";
import { useUser } from "../../../../context/UserContext";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { UpdatePromptForm } from "../../../../forms/UpdatePromptForm/UpdatePromptForm";
import { decrypt, encrypt } from "../../../../utils/uiUtils";

interface PromptCard {
    prompt: Prompt,
    navbarMobileHandle: any,
    itemRef: any
}

export function PromptCard({ prompt, navbarMobileHandle, itemRef }: PromptCard) {
    const [detailsOpened, detailsHandle] = useDisclosure(false);
    const [editOpened, editHandle] = useDisclosure(false);
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { user } = useUser();
    const clipboard = useClipboard({ timeout: 500 });

    const deleteMutation = useDeletePromptMutation();

    const play = async (e: any) => {
        e.stopPropagation();

        const newPromptRequest = Prompt.clone(prompt) as PromptRequest;
        newPromptRequest.key = Date.now();
        newPromptRequest.isPlayable = true;
        newPromptRequest.type = PromptRequestType.Prompt;

        // If there is no provider, get the default one
        if (!newPromptRequest.provider) {
            newPromptRequest.provider = await getDefaultProvider(newPromptRequest.technology.id);
        }

        navbarMobileHandle.close();

        setPromptsRequests([
            ...promptsRequests,
            newPromptRequest
        ]);
    }

    const isUserItem = user.external_id === prompt.user.external_id;

    const openDetails = (e: any) => {
        e.stopPropagation();
        detailsHandle.open()
    }

    if (deleteMutation.isError) {
        notifications.show({
            title: "Error",
            message: deleteMutation.error.message,
            color: "red"
        });
    }

    if (deleteMutation.isSuccess) {
        notifications.show({
            title: "Item Deleted",
            message: "",
            color: "blue"
        });
    }

    const openDeleteModal = (e: any) => {
        e.stopPropagation();

        modals.openConfirmModal({
            title: 'Delete this item',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this item? This action is will modify the outcome of other items
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: "Cancel" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => deleteMutation.mutate(prompt.id),
        });
    }

    const copyPublicURL = (e: any) => {
        e.stopPropagation();

        clipboard.copy(window.location.origin + window.location.pathname + '?prompt_id=' + encrypt(prompt.id));

        notifications.show({
            title: "URL Copied",
            message: "",
            color: "blue"
        });
    }

    const openEdit = (e: any) => {
        e.stopPropagation();

        editHandle.open();
    }

    return (
        <>
            <PromptCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                prompt={prompt}
                deleteMutation={deleteMutation}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Update Prompt" size={"lg"}>
                <UpdatePromptForm prompt={prompt} handle={editHandle} />
            </Modal>
            <Accordion.Item ref={itemRef} value={`${prompt.type}-${prompt.id}`}>
                <Accordion.Control>
                    <Stack>
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {prompt.repository.name}
                                </Badge>
                                <Text size="sm" fw={700} lineClamp={20}>
                                    {prompt.title}
                                </Text>
                            </Stack>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon variant="transparent" color="gray.9" component="a" onClick={e => e.stopPropagation()}>
                                        <IconDotsVertical size={16} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item onClick={openDetails} leftSection={<IconFileDescription size={14} />}>
                                        <Text size="xs">Details</Text>
                                    </Menu.Item>
                                    <Menu.Item onClick={e => copyPublicURL(e)} leftSection={<IconCopy size={14} />}>
                                        {
                                            clipboard.copied
                                                ? <Text size="xs">Copied</Text>
                                                : <Text size="xs">Copy URL</Text>
                                        }
                                    </Menu.Item>
                                    {
                                        isUserItem &&
                                        <Menu.Item onClick={e => openEdit(e)} leftSection={<IconEdit size={14} />}>
                                            Edit
                                        </Menu.Item>
                                    }
                                    {
                                        isUserItem &&
                                        <Menu.Item onClick={e => openDeleteModal(e)} leftSection={<IconTrash size={14} />} color="red">
                                            <Text size="xs">Delete</Text>
                                        </Menu.Item>
                                    }
                                </Menu.Dropdown>
                            </Menu>
                        </Group>

                        <Group justify="space-between" wrap="nowrap">
                            <Badge size={"xs"} variant="dot" h={"auto"}>
                                <ProviderLabel
                                    size="xs"
                                    technology={prompt.technology}
                                    provider={prompt.provider}
                                    templates={prompt.prompts_templates.map(t => t.template)}
                                    modifiers={prompt.prompts_modifiers.map(m => m.modifier)}
                                />
                            </Badge>
                            <ActionIcon component="a" variant="filled" size={"md"} onClick={(e: any) => play(e)}>
                                {iconPlay(14)}
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <DatabaseCardContent item={prompt} detailsHandle={detailsHandle} />
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}