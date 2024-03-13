import { Button, Group, Modal } from "@mantine/core";
import { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconTemplate } from "@tabler/icons-react";
import { TemplateForm } from "../../components/Forms/TemplateForm/TemplateForm";
import { useCreateTemplateMutation } from "../../api/templatesApi";

export const CreateTemplateButton: FC = () => {
    const [opened, handle] = useDisclosure(false);
    const mutation = useCreateTemplateMutation();

    return (
        <>
            <Modal opened={opened} onClose={handle.close} title="Create Template" size={"lg"}>
                <TemplateForm mutation={mutation} handle={handle} />
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

