import { ActionIcon, Text, Modal, Tooltip } from "@mantine/core";
import { Prompt } from "../../../../models/Prompt";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { PromptCardDetails } from "../PromptCardDetails/PromptCardDetails";
import { iconPlay } from "../../../../utils/iconsUtils";
import { useDeletePromptMutation, usePromptQuery, useUpdatePromptMutation } from "../../../../api/promptsApi";
import { getDefaultProvider } from "../../../../api/providersApi";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";
import { Thread } from "../../../../models/Thread";
import DatabaseCard from "../../../../features/DatabaseCard/DatabaseCard";
import { DatabaseCardDetails } from "../../Common/DatabaseCardDetails/DatabaseCardDetails";

interface PromptCard {
    prompt: Prompt,
    navbarMobileHandle: any,
    itemRef: any
}

export function PromptCard({ prompt, navbarMobileHandle, itemRef }: PromptCard) {
    const [
        user,
        threads,
        setThreads,
    ] = useStore(useShallow(state => [
        state.user,
        state.threads,
        state.setThreads,
    ]));

    const [detailsOpened, detailsHandle] = useDisclosure(false);
    const [editOpened, editHandle] = useDisclosure(false);
    const clipboard = useClipboard({ timeout: 500 });

    const deleteMutation = useDeletePromptMutation();

    const play = async (e: any) => {
        e.stopPropagation();

        const newThread = Thread.buildFromPrompt(prompt);
        // newThread.threads_chat_messages.pop();
        newThread.key = Date.now();

        // If there is no provider, get the default one
        if (newThread.provider.uuid === "") {
            newThread.provider = await getDefaultProvider(newThread.technology);
        }

        // navbarMobileHandle.close();

        setThreads([
            ...threads,
            newThread
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
            onConfirm: () => deleteMutation.mutate(prompt.uuid),
        });
    }

    const copyPublicURL = (e: any) => {
        e.stopPropagation();
        clipboard.copy(window.location.origin + window.location.pathname + '?prompt_id=' + prompt.uuid);

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

    const updateMutation = useUpdatePromptMutation(prompt.uuid);

    const actionElement = <Tooltip label="Play">
        <ActionIcon component="a" variant="filled" size={"sm"} onClick={(e: any) => play(e)}>
            {iconPlay(12)}
        </ActionIcon>
    </Tooltip>;

    return (
        <>
            <PromptCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                prompt={prompt}
                deleteMutation={deleteMutation}
                openEdit={openEdit}
                copyURL={copyPublicURL}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Update Prompt" size={"lg"}>
                <PromptForm mutation={updateMutation} prompt={prompt} handle={editHandle} />
            </Modal>
            <DatabaseCard
                item={prompt}
                openDetails={openDetails}
                openEdit={openEdit}
                openDeleteModal={openDeleteModal}
                copyURL={copyPublicURL}
                actionElement={actionElement}
                color="blue"
            />
        </>
    )
}