import { Card, Center, Grid, Group, Modal, Radio, SegmentedControl, SimpleGrid, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { Label, Type } from "../../../model/SelectedDatabaseType";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { PromptForm } from "../../Forms/PromptForm/PromptForm";
import { ModifierForm } from "../../Forms/ModifierForm/ModifierForm";
import { TemplateForm } from "../../Forms/TemplateForm/TemplateForm";
import { IconEye } from "@tabler/icons-react";

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
    const [type, setType] = useState<string>(selectedDatabaseType.type.toString());
    let description = "";

    let form = <></>;
    switch (type) {
        case Type.PROMPT:
            form = <PromptForm promptRequest={promptRequest} handle={handle} />
            description = "Prompts are pre-made AI instruction to execute on the fly";
            break;
        case Type.TEMPLATE:
            form = <TemplateForm promptRequest={promptRequest} handle={handle} />
            description = "Templates are pre-configured options to be used when building new prompts";

            break;
        case Type.MODIFIER:
            form = <ModifierForm promptRequest={promptRequest} handle={handle} />
            description = "Modifiers are reusable text blocks that can be applyed to templates and prompts";

            break;
    }

    const title = `New ${type.toLowerCase()}`;

    return (
        <Modal opened={opened} onClose={handle.close} title={title} size={"lg"}>
            <Stack my={"xs"}>
                <Card>
                    <Grid gutter={"xs"} align="center">
                        <Grid.Col span={{ base: 12, sm: 7 }}>
                            <Radio.Group value={type} onChange={setType} size="md">
                                <Group justify="flex-start">
                                    <Radio value={Type.PROMPT} label={Label.Prompt} />
                                    <Radio value={Type.TEMPLATE} label={Label.Tempalate} />
                                    <Radio value={Type.MODIFIER} label={Label.Modifier} />
                                </Group>
                            </Radio.Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 5 }}>
                            <Text size="sm">{description}</Text>
                        </Grid.Col>
                    </Grid>
                </Card>
                {form}
            </Stack>

        </Modal>
    )
}