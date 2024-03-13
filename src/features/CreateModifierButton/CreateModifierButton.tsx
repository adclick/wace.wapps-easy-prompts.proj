import { Button, Group, Modal } from "@mantine/core";
import { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconSparkles } from "@tabler/icons-react";
import { ModifierForm } from "../../components/Forms/ModifierForm/ModifierForm";
import { useCreateModifierMutation } from "../../api/modifiersApi";

export const CreateModifierButton: FC = () => {
    const [opened, handle] = useDisclosure(false);
    const mutation = useCreateModifierMutation();

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Create Modifier" size={"lg"}>
                <ModifierForm mutation={mutation} handle={handle} />
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

