import { Card, Center, Group, Modal, SegmentedControl, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { Label, Type } from "../../../model/SelectedDatabaseType";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { PromptForm } from "../../Forms/PromptForm/PromptForm";
import { ModifierForm } from "../../Forms/ModifierForm/ModifierForm";
import { TemplateForm } from "../../Forms/TemplateForm/TemplateForm";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPrompt, IconSparkles, IconTemplate } from "@tabler/icons-react";

interface SaveModal {
    opened: boolean,
    handle: any,
    promptRequest: PromptRequest | undefined,
}

export function SaveModal({
    opened,
    handle,
    promptRequest,
}: SaveModal) {

    const { selectedFilters } = useSelectedFilters();
    if (!selectedFilters) return <></>;

    const { selectedDatabaseType } = useSelectedDatabaseType();
    const [type, setType] = useState(selectedDatabaseType.type.toString());
    let description = "";

    let form = <></>;
    switch (type) {
        case Type.PROMPT:
            form = <PromptForm promptRequest={promptRequest} handle={handle} />
            description = "Prompts are pre-made AI instruction to execute on the fly ction to execute on the f";
            break;
        case Type.TEMPLATE:
            form = <TemplateForm promptRequest={promptRequest} handle={handle} />
            description = "templates";

            break;
        case Type.MODIFIER:
            form = <ModifierForm promptRequest={promptRequest} handle={handle} />
            description = "modifiers";

            break;
    }

    const title = `New ${type.toLowerCase()}`;


    return (
        <Modal opened={opened} onClose={handle.close} title={title} size={"lg"}>
            <Stack my={"xs"}>
                <Group justify="space-between">
                    <Stack gap={"xs"}>
                        <Text size="sm">How it works?</Text>
                        <Text size="xs">
                            {
                                description
                            }
                        </Text>
                    </Stack>
                    <SegmentedControl
                        value={type}
                        size="xs"
                        color="blue"
                        fullWidth
                        radius={"sm"}
                        data={[
                            {
                                value: Type.PROMPT, label: (
                                    <Group justify="space-between" wrap="nowrap" gap={4} px={4}>
                                        <IconPrompt size={16} />
                                        <Text size="xs">{Label.Prompt}</Text>
                                    </Group>

                                )
                            },
                            {
                                value: Type.TEMPLATE, label: (
                                    <Group justify="space-between" wrap="nowrap" gap={4} px={4}>
                                        <IconTemplate size={16} />
                                        <Text size="xs">{Label.Tempalate}</Text>
                                    </Group>

                                )
                            },
                            {
                                value: Type.MODIFIER, label: (
                                    <Group justify="space-between" wrap="nowrap" gap={4} px={4}>
                                        <IconSparkles size={16} />
                                        <Text size="xs">{Label.Modifier}</Text>
                                    </Group>

                                )
                            },
                        ]}
                        onChange={setType}
                    />
                </Group>

                {form}
            </Stack>
        </Modal>
    )
}