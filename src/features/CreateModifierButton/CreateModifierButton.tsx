import { Button, Group, Modal } from "@mantine/core";
import { FC } from "react";
import { CreateModifierForm } from "../../forms/CreateModifierForm/CreateModifierForm";
import { useDisclosure } from "@mantine/hooks";
import { IconSparkles } from "@tabler/icons-react";

export const CreateModifierButton: FC = () => {
    const [opened, handle] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Create Modifier" size={"lg"}>
                <CreateModifierForm handle={handle} />
            </Modal>
            <Group>
                <Button
                    leftSection={<IconSparkles size={14} />}
                    onClick={handle.open}
                    size="compact-sm"
                    variant="transparent"
                    color="--mantine-color-text"
                >
                    Create Modifier
                </Button>
            </Group>
        </>
    )
}

