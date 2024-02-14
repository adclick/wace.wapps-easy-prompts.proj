import { Button, Group, Modal } from "@mantine/core";
import { FC } from "react";
import { CreateTemplateForm } from "../../forms/CreateTemplateForm/CreateTemplateForm";
import { useDisclosure } from "@mantine/hooks";
import { IconTemplate } from "@tabler/icons-react";

export const CreateTemplateButton: FC = () => {
    const [opened, handle] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Create Template" size={"lg"}>
                <CreateTemplateForm handle={handle} />
            </Modal>
            <Group>
                <Button
                    leftSection={<IconTemplate size={14} />}
                    onClick={handle.open}
                    size="compact-sm"
                    variant="transparent"
                    color="--mantine-color-text"
                >
                    Create Template
                </Button>
            </Group>
        </>
    )
}

