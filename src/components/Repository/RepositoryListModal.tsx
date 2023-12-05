import { ActionIcon, Button, Group, Modal, Table, rem } from "@mantine/core";
import { Repository } from "../../model/Repository";
import { IconArrowRight, IconDoorEnter, IconLogin, IconPencil, IconSwitch, IconSwitchHorizontal, IconTrash } from "@tabler/icons-react";
import { Filters } from "../../model/Filters";

interface RepositoryListModal {
    opened: boolean,
    close: any,
    repositories: Repository[],
    filters: Filters,
    setFilters: any,
    refreshRepository: any
}

export function RepositoryListModal({
    opened,
    close,
    repositories,
    filters,
    setFilters,
    refreshRepository
}: RepositoryListModal) {
    const switchRepository = (repositorySlug: string) => {
        const newFilters = {
            ...filters,
            repository: repositorySlug
        };

        setFilters(newFilters);
        refreshRepository(newFilters);

        close();
    }

    const rows = repositories.map((repository) => (
        <Table.Tr key={repository.slug}>
            <Table.Td>{repository.name}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon onClick={() => switchRepository(repository.slug)} variant="transparent" size={"xs"}>
                        <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} />
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