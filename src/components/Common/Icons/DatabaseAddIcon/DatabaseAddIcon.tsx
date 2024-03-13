import { ActionIcon, Group, Modal, Radio, Stack, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './DatabaseAddIcon.module.css';
import { useDisclosure } from "@mantine/hooks";
import { useCreatePromptMutation } from "../../../../api/promptsApi";
import { useCreateTemplateMutation } from "../../../../api/templatesApi";
import { useCreateModifierMutation } from "../../../../api/modifiersApi";
import { useState } from "react";
import { TemplateForm } from "../../../Forms/TemplateForm/TemplateForm";
import { ModifierForm } from "../../../Forms/ModifierForm/ModifierForm";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";

interface DatabaseAddIcon {
    onClick: any,
    createItemOpened: boolean
}

export function DatabaseAddIcon({ onClick, createItemOpened }: DatabaseAddIcon) {
    const variant = createItemOpened ? "light" : "subtle";

    const [newPromptModalOpened, newPromptModalHandle] = useDisclosure(false);
    const promptCreateMutation = useCreatePromptMutation();
    const templateCreateMutation = useCreateTemplateMutation();
    const modifierCreateMutation = useCreateModifierMutation();

    const [formType, setFormType] = useState('prompt');
    return (
        <>
            <Modal opened={newPromptModalOpened} onClose={newPromptModalHandle.close} title={`Create ${formType}`} size={"lg"}>
                <Stack>
                    <Radio.Group
                        value={formType}
                        onChange={setFormType}
                        withAsterisk
                    >
                        <Group>
                            <Radio value="prompt" label="Prompt" />
                            <Radio value="template" label="Template" />
                            <Radio value="modifier" label="Modifier" />
                        </Group>
                    </Radio.Group>

                    {
                        formType === 'prompt' && <PromptForm handle={newPromptModalHandle} mutation={promptCreateMutation} />
                    }
                    {
                        formType === 'template' && <TemplateForm handle={newPromptModalHandle} mutation={templateCreateMutation} />
                    }
                    {
                        formType === 'modifier' && <ModifierForm handle={newPromptModalHandle} mutation={modifierCreateMutation} />
                    }
                </Stack>

            </Modal>
            <Tooltip label={"Create"}>
                <ActionIcon
                    className={classes.icon}
                    size="lg"
                    onClick={newPromptModalHandle.open}
                    variant={variant}
                    color="gray"
                >
                    {
                        iconAdd("md")
                    }
                </ActionIcon>
            </Tooltip>
        </>
    );
}