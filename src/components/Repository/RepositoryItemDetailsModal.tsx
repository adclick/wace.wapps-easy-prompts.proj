import { Modal } from "@mantine/core";

interface RepositoryItemDetailsModal {
    opened: boolean,
    close: any
}

export function RepositoryItemDetailsModal({
    opened,
    close
}: RepositoryItemDetailsModal) {
    return (
        <Modal opened={opened} onClose={close} title="Details">

        </Modal>
    )
}