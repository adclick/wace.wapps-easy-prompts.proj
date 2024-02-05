import { Accordion, Badge, Group, Stack, Text, Checkbox, Menu, ActionIcon, Modal } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { Template } from "../../../../models/Template";
import { useDisclosure } from "@mantine/hooks";
import { TemplateCardDetails } from "../TemplateCardDetails/TemplateCardDetails";
import classes from './TemplateCard.module.css';
import { useDeleteTemplateMutation } from "../../../../api/templatesApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { DatabaseCardContent } from "../../Common/DatabaseCardContent/DatabaseCardContent";
import { useUser } from "../../../../context/UserContext";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { UpdateTemplateForm } from "../../../../forms/UpdateTemplateForm/UpdateTemplateForm";

interface TemplateCard {
    template: Template,
    itemRef: any
}

export function TemplateCard({ template, itemRef }: TemplateCard) {
    const [detailsOpened, detailsHandle] = useDisclosure(false);
    const [editOpened, editHandle] = useDisclosure(false);
    const deleteMutation = useDeleteTemplateMutation();

    const { user } = useUser();

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
            onConfirm: () => deleteMutation.mutate(template.id),
        });
    }

    const openEdit = (e: any) => {
        e.stopPropagation();

        editHandle.open();
    }

    return (
        <>
            <TemplateCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                template={template}
                deleteMutation={deleteMutation}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Edit Template">
                <UpdateTemplateForm template={template} handle={editHandle} />
            </Modal>
            <Accordion.Item ref={itemRef} value={template.id.toString()}>
                <Accordion.Control>
                    <Stack>
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {template.repository.name}
                                </Badge>
                                <Text size="sm" fw={500} lineClamp={20}>
                                    {template.title}
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
                                    technology={template.technology}
                                    provider={template.provider}
                                    templates={[]}
                                    modifiers={template.templates_modifiers.map(m => m.modifier)}
                                />
                            </Badge>
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }} value={template.id.toString()}
                                size="md"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <DatabaseCardContent item={template} detailsHandle={detailsHandle} />
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}