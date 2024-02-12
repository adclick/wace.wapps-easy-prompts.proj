import { Group, Modal, Radio, Stack } from "@mantine/core";
import { PromptRequest } from "../../../models/PromptRequest";
import { Label, Type } from "../../../models/SelectedDatabaseType";
import { PromptForm } from "../../Forms/PromptForm/PromptForm";

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

    let form = <></>;
    form = <PromptForm promptRequest={promptRequest} handle={handle} />

    const title = `New Prompt`;

    return (
        <Modal opened={opened} onClose={handle.close} title={title} size={"lg"}>
            <Stack my={"xs"}>
                <Group justify="flex-end">
                    <Radio value={Type.PROMPT} label={Label.Prompt} />
                    <Radio value={Type.TEMPLATE} label={Label.Tempalate} />
                    <Radio value={Type.MODIFIER} label={Label.Modifier} />
                </Group>
                {form}
            </Stack>

        </Modal>
    )
}