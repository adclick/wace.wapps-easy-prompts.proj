import { ActionIcon, Button, Group, Modal, Table } from "@mantine/core";
import { Repository } from "../../model/Repository";
import { IconArrowRight, IconDoorEnter, IconLogin, IconSwitch } from "@tabler/icons-react";

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
                <ActionIcon variant="light">
                    <IconArrowRight />
                </ActionIcon>
            </Group>
          </Table.Td>
        </Table.Tr>
      ));

    return (
        <Modal opened={opened} onClose={close} title="Repositories" size={"lg"}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Repository</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Modal>
    )
}