import { Modal, Card, Stack, Title, Text, Group, Button, Divider, rem, ActionIcon } from "@mantine/core";
import { RepositoryItem } from "../../model/RepositoryItem";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";

interface RepositoryItemDetailsModal {
    opened: boolean,
    handle: any,
    item: RepositoryItem,
    setRepositorySelectedItems: any
}

export function RepositoryItemDetailsModal({
    opened,
    handle,
    item,
    setRepositorySelectedItems
}: RepositoryItemDetailsModal) {

    const use = () => {
        setRepositorySelectedItems([item]);
        handle.close();
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={item.name}>
            <Stack>
                <Text size="sm">{item.content}</Text>
                {/* <Divider />
                <Group justify="space-between">
                    <Button size="xs" variant="light" color={item.color} onClick={use} leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}>
                        Apply
                    </Button>
                    <ActionIcon variant='subtle' color="red">
                        <IconTrash style={{ width: rem(16), height: rem(16) }}  />
                    </ActionIcon>
                </Group> */}
            </Stack>






        </Modal>
    )
}