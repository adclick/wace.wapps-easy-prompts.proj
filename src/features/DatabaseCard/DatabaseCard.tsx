import { Accordion, ActionIcon, Badge, Button, Group, Stack, Text, Tooltip } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Technology } from "../../models/Technology";
import { IconEye, IconLink, IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { Modifier } from "../../models/Modifier";
import { Prompt } from "../../models/Prompt";
import { Template } from "../../models/Template";
import classes from "./DatabaseCard.module.css";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";

interface DatabaseCardProps {
    item: Prompt | Template | Modifier,
    openDetails: any,
    openEdit: any,
    openDeleteModal: any,
    copyURL: any,
    actionElement: ReactNode,
    color: string
}

const DatabaseCard: FC<DatabaseCardProps> = ({
    item,
    openDetails,
    openEdit,
    openDeleteModal,
    copyURL,
    actionElement,
    color
}: DatabaseCardProps) => {
    const [
        user,
    ] = useStore(useShallow(state => [
        state.user,
    ]));

    const isUserItem = user.external_id === item.user.external_id;

    return (
        <Accordion.Item className={classes.card} value={item.uuid}>
            <Accordion.Control>
                <Stack>
                    <Group justify="space-between" wrap="nowrap" align="center">
                        <Group wrap="nowrap" gap={"xs"}>
                            <Tooltip label={item.technology.name}>
                                <ActionIcon color={color} component="a" variant="transparent" ml={-4}>
                                    {
                                        Technology.getIcon(item.technology, 18)
                                    }
                                </ActionIcon>
                            </Tooltip>
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {item.repository.name}
                                </Badge>
                                <Tooltip label={item.title}>
                                    <Text size="xs" fw={700} lineClamp={1}>
                                        {item.title}
                                    </Text>
                                </Tooltip>
                            </Stack>
                        </Group>
                        <Group wrap="nowrap" gap={"xs"}>
                            {actionElement}
                        </Group>
                    </Group>

                </Stack>
            </Accordion.Control >
            <Accordion.Panel>
                <Stack gap={"lg"}>
                    <Group justify="space-between">
                        <Group>
                        </Group>
                        <Group>
                            {
                                item.provider &&
                                <Badge variant="dot" size="xs" color={color}>
                                    {item.provider.model_name}
                                </Badge>
                            }
                        </Group>
                    </Group>

                    {
                        item.description &&
                        <Group wrap="nowrap" justify="space-between" align="flex-start">
                            <Text size="xs" c={"dimmed"} fw={500}>{item.description}</Text>
                        </Group>
                    }

                    <Stack gap={"xs"}>
                        <Button size="compact-xs" leftSection={<IconEye size={14} />} onClick={openDetails} variant="subtle"
                        >
                            View
                        </Button>
                        <Button size="compact-xs"  leftSection={<IconLink size={14} />} onClick={copyURL} variant="subtle"
                        >
                            Copy URL
                        </Button>
                        {
                            isUserItem &&
                            <Button size="compact-xs" leftSection={<IconPencil size={14} />} onClick={openEdit} variant="subtle"
                            >
                                Edit
                            </Button>
                        }
                        {
                            isUserItem &&
                            <Button color="red" size="compact-xs" leftSection={<IconTrash size={14} />} onClick={openDeleteModal} variant="subtle"
                            >
                                Delete
                            </Button>
                        }
                    </Stack>

                </Stack>
            </Accordion.Panel>
        </Accordion.Item >
    )
}

export default DatabaseCard;