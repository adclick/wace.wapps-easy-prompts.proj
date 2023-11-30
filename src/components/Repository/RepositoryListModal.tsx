import { ActionIcon, Button, Group, Modal, Table, rem } from "@mantine/core";
import { Repository } from "../../model/Repository";
import { IconArrowRight, IconDoorEnter, IconLogin, IconPencil, IconSwitch, IconSwitchHorizontal, IconTrash } from "@tabler/icons-react";

interface RepositoryListModal {
    opened: boolean,
    close: any,
    repositories: Repository[]
}

export function RepositoryListModal({
    opened,
    close,
    repositories
}: RepositoryListModal) {
    const rows = repositories.map((repository) => (
        <Table.Tr key={repository.slug}>
            <Table.Td>{repository.name}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon variant="transparent" size={"xs"}>
                        <IconPencil style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                    <ActionIcon variant="transparent" size={"xs"}>
                        <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                    <ActionIcon color="red" variant="transparent" size={"xs"}>
                        <IconTrash style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Modal opened={opened} onClose={close} title="Repositories" size={"lg"}>
            <Table >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>List</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Modal>
    )
}