import { Accordion, Badge, Group, Stack, Text, Checkbox, Modal, Menu, ActionIcon, Tooltip, Button } from "@mantine/core";
import { Modifier } from "../../../../models/Modifier";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { ModifierCardDetails } from "../ModifierCardDetails/ModifierCardDetails";
import classes from './ModifierCard.module.css';
import { useDeleteModifierMutation, useUpdateModifierMutation } from "../../../../api/modifiersApi";
import { IconCopy, IconDots, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { MouseEvent } from "react";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { ModifierForm } from "../../../Forms/ModifierForm/ModifierForm";
import { Technology } from "../../../../models/Technology";
import { Color } from "../../../../enums";
import DatabaseCard from "../../../../features/DatabaseCard/DatabaseCard";

interface ModifierCard {
    modifier: Modifier,
    itemRef: any
}

export function ModifierCard({ modifier, itemRef }: ModifierCard) {
    const [modifierDetailsOpened, modifierDetailsHandle] = useDisclosure(false);
    const deleteMutation = useDeleteModifierMutation();
    const clipboard = useClipboard({ timeout: 500 });

    const [editOpened, editHandle] = useDisclosure(false);

    const [user] = useStore(useShallow(state => [state.user]));

    const isUserItem = user.external_id === modifier.user.external_id;

    const openDetails = (e: any) => {
        e.stopPropagation();
        modifierDetailsHandle.open()
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
            onConfirm: () => deleteMutation.mutate(modifier.uuid),
        });
    }

    const copyPublicURL = (e: any) => {
        e.stopPropagation();
        clipboard.copy(window.location.origin + window.location.pathname + '?modifier_id=' + modifier.uuid);

        notifications.show({
            title: "URL Copied",
            message: "",
            color: "blue"
        });
    }


    const openEdit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();

        editHandle.open();
    }

    const updateMutation = useUpdateModifierMutation(modifier.uuid);

    const actionElement = <Checkbox
        classNames={{
            input: classes.inputCheckbox
        }}
        value={modifier.id.toString()}
        size="sm"
        onClick={e => e.stopPropagation()}
    />;

    return (
        <>
            <ModifierCardDetails
                opened={modifierDetailsOpened}
                handle={modifierDetailsHandle}
                modifier={modifier}
                deleteMutation={deleteMutation}
                openEdit={openEdit}
                copyURL={copyPublicURL}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Edit Modifier" size={"lg"}>
                <ModifierForm mutation={updateMutation} modifier={modifier} handle={editHandle} />
            </Modal>
            <DatabaseCard
                item={modifier}
                openDetails={openDetails}
                openEdit={openEdit}
                openDeleteModal={openDeleteModal}
                copyURL={copyPublicURL}
                actionElement={actionElement}
                color="teal"
            />
        </>
    )
}