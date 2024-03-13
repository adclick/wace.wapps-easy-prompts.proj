import { Accordion, Badge, Group, Stack, Text, Checkbox, Menu, ActionIcon, Modal, Tooltip, Button } from "@mantine/core";
import { IconCopy, IconDots, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { Template } from "../../../../models/Template";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { TemplateCardDetails } from "../TemplateCardDetails/TemplateCardDetails";
import classes from './TemplateCard.module.css';
import { useDeleteTemplateMutation, useUpdateTemplateMutation } from "../../../../api/templatesApi";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { TemplateForm } from "../../../Forms/TemplateForm/TemplateForm";
import { Technology } from "../../../../models/Technology";
import { Color } from "../../../../enums";
import DatabaseCard from "../../../../features/DatabaseCard/DatabaseCard";

interface TemplateCard {
    template: Template,
    itemRef: any
}

export function TemplateCard({ template, itemRef }: TemplateCard) {
    const [detailsOpened, detailsHandle] = useDisclosure(false);
    const [editOpened, editHandle] = useDisclosure(false);
    const deleteMutation = useDeleteTemplateMutation();
    const clipboard = useClipboard({ timeout: 500 });

    const [user] = useStore(useShallow(state => [state.user]));

    const isUserItem = user.external_id === template.user.external_id;

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
            onConfirm: () => deleteMutation.mutate(template.uuid),
        });
    }

    const copyPublicURL = (e: any) => {
        e.stopPropagation();
        clipboard.copy(window.location.origin + window.location.pathname + '?template_id=' + template.uuid);

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

    const updateMudation = useUpdateTemplateMutation(template.uuid);

    const actionElement = <Checkbox
        classNames={{
            input: classes.inputCheckbox
        }}
        value={template.id.toString()}
        size="sm"
        onClick={e => e.stopPropagation()}
    />;

    return (
        <>
            <TemplateCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                template={template}
                deleteMutation={deleteMutation}
                openEdit={openEdit}
                copyURL={copyPublicURL}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Edit Template" size={"lg"}>
                <TemplateForm mutation={updateMudation} template={template} handle={editHandle} />
            </Modal>
            <DatabaseCard
                item={template}
                openDetails={openDetails}
                openEdit={openEdit}
                openDeleteModal={openDeleteModal}
                copyURL={copyPublicURL}
                actionElement={actionElement}
                color="orange"
            />
        </>
    )
}