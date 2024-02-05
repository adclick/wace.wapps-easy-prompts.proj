import { Button, Modal } from "@mantine/core";
import { Modifier } from "../../../../models/Modifier";
import { UpdateModifierForm } from "../../../../forms/UpdateModifierForm/UpdateModifierForm";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

interface ModifierEditButton {
    modifier: Modifier
}

export function ModifierEditButton({ modifier }: ModifierEditButton) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close}>
                <UpdateModifierForm modifier={modifier} />
            </Modal>
            <Button leftSection={<IconEdit size={14} />} variant="transparent" color="gray">
                Edit
            </Button>
        </>
    )
}