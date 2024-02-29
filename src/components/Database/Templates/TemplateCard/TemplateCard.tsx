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

    return (
        <>
            <TemplateCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                template={template}
                deleteMutation={deleteMutation}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Edit Template" size={"lg"}>
                <TemplateForm mutation={updateMudation} template={template} handle={editHandle} />
            </Modal>
            <Accordion.Item className={classes.card} ref={itemRef} value={template.id.toString()}>
                <Accordion.Control>
                    <Group justify="space-between" wrap="nowrap" align="center">
                        <Group wrap="nowrap" gap={"xs"}>
                            <Tooltip label={template.technology.name}>
                                <ActionIcon component="a" variant="transparent" ml={-4}>
                                    {
                                        Technology.getIcon(template.technology, 18, Color.orange)
                                    }
                                </ActionIcon>
                            </Tooltip>
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {template.repository.name}
                                </Badge>
                                <Text size="xs" fw={700} lineClamp={1}>
                                    {template.title}
                                </Text>
                            </Stack>
                        </Group>
                        <Group gap={"xs"} wrap="nowrap">
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon variant="transparent" color="--mantine-color-text" component="a" onClick={e => e.stopPropagation()}>
                                        <IconDots size={16} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item onClick={openDetails} leftSection={<IconFileDescription size={14} />}>
                                        Details
                                    </Menu.Item>
                                    <Menu.Item onClick={e => copyPublicURL(e)} leftSection={<IconCopy size={14} />}>
                                        {
                                            clipboard.copied ? 'Copied' : 'Copy URL'
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
                                            Delete
                                        </Menu.Item>
                                    }
                                </Menu.Dropdown>
                            </Menu>
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }}
                                value={template.id.toString()}
                                size="sm"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Group>
                </Accordion.Control >
                <Accordion.Panel>
                    <Stack gap={"lg"}>
                        <Group wrap="nowrap" justify="space-between" align="flex-start">
                            <Text size="xs" c={"dimmed"} fw={500}>{template.description}</Text>
                        </Group>

                        <Group justify="space-between">

                            <Button onClick={openDetails} size="xs" variant="transparent" color="--mantine-text-color" px={0} leftSection={<IconFileDescription size={14} />}>
                                Details
                            </Button>
                            {
                                template.provider &&
                                <Badge variant="dot" size="sm">
                                    {template.provider.model_name}
                                </Badge>

                            }

                        </Group>
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}