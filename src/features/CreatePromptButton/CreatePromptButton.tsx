import { Button, Group, Modal } from "@mantine/core";
import { FC } from "react";
import { PromptForm } from "../../forms/PromptForm/PromptForm";
import { useDisclosure } from "@mantine/hooks";
import { IconPrompt, IconSparkles } from "@tabler/icons-react";
import { useCreatePromptMutation } from "../../api/promptsApi";

export const CreatePromptButton: FC = () => {
    const [opened, handle] = useDisclosure(false);
    const mutation = useCreatePromptMutation();

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Create Prompt" size={"lg"}>
                <PromptForm mutation={mutation} handle={handle} />
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

