import { Button, Group, Modal } from "@mantine/core";
import { FC } from "react";
import { CreatePromptForm } from "../../forms/CreatePromptForm/CreatePromptForm";
import { useDisclosure } from "@mantine/hooks";
import { IconPrompt, IconSparkles } from "@tabler/icons-react";

export const CreatePromptButton: FC = () => {
    const [opened, handle] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Create Prompt" size={"lg"}>
                <CreatePromptForm handle={handle} />
            </Modal>
            <Group>
                <Button
                    leftSection={<IconPrompt size={14} />}
                    onClick={handle.open}
                    size="compact-sm"
                    variant="transparent"
                    color="--mantine-color-text"
                >
                    Create Prompt
                </Button>
            </Group>
        </>
    )
}

