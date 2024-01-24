import { SegmentedControl, Stack } from "@mantine/core";
import { useState } from "react";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { Label, Type } from "../../../model/SelectedDatabaseType";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { PromptForm } from "../../Forms/PromptForm/PromptForm";
import { ModifierForm } from "../../Forms/ModifierForm/ModifierForm";
import { TemplateForm } from "../../Forms/TemplateForm/TemplateForm";

interface SaveModal {
    handle: any
    promptRequest: PromptRequest | undefined,
}

export function SaveModal({
    handle,
    promptRequest,
}: SaveModal) {
    const { selectedFilters } = useSelectedFilters();
    if (!selectedFilters) return <></>;

    const { selectedDatabaseType } = useSelectedDatabaseType();
    const [type, setType] = useState(selectedDatabaseType.type.toString());

    let form = <></>;
    switch (type) {
        case Type.PROMPT:
            form = <PromptForm promptRequest={promptRequest} />
            break;
        case Type.TEMPLATE:
            form = <TemplateForm promptRequest={promptRequest} />
            break;
        case Type.MODIFIER:
            form = <ModifierForm promptRequest={promptRequest} />
            break;
    }

    return (
        <Stack my={"xs"}>
            <SegmentedControl
                value={type}
                size="sm"
                color="blue"
                data={[
                    { value: Type.PROMPT, label: Label.Prompt },
                    { value: Type.TEMPLATE, label: Label.Tempalate },
                    { value: Type.MODIFIER, label: Label.Modifier },
                ]}
                onChange={setType}
            />
            {form}
        </Stack>
    )
}