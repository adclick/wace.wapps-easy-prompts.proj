import { Button, Popover, Text } from "@mantine/core";
import { PromptRequest } from "../../../../model/PromptRequest";
import { IconSparkles, IconTemplate } from "@tabler/icons-react";
import { Modifier } from "../../../../model/Modifier";
import { Template } from "../../../../model/Template";

interface ThreadInfoButton {
    promptRequest: PromptRequest
}

export function ThreadInfoButton({ promptRequest }: ThreadInfoButton) {
    if (!promptRequest.metadata) return <></>;

    let modifiers: Modifier[] = [];
    if ("modifiers" in promptRequest.metadata) {
        modifiers = promptRequest.metadata.modifiers;
    }
    
    let templates: Template[] = [];
    if ("templates" in promptRequest.metadata) {
        templates = promptRequest.metadata.templates;
    }

    if (modifiers.length <= 0 && templates.length <= 0) return <></>;

    if (templates.length > 0) {
        return (
            <Popover position="top">
                <Popover.Target>
                    <Button size="compact-xs" variant="transparent" color="gray" leftSection={<IconTemplate size={16} />}>
                        {`Templates used (${templates.length})`}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    {
                        templates.map(m => {
                            return (
                                <Text size="xs">{m.title}</Text>
                            )
                        })
                    }
                </Popover.Dropdown>
            </Popover>
        )
    }

    if (modifiers.length > 0) {
        return (
            <Popover position="top">
                <Popover.Target>
                    <Button size="compact-xs" variant="transparent" color="gray" leftSection={<IconSparkles size={16} />}>
                    {`Modifiers used (${modifiers.length})`}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    {
                        modifiers.map(m => {
                            return (
                                <Text size="xs">{m.title}</Text>
                            )
                        })
                    }
                </Popover.Dropdown>
            </Popover>
        )
    }
}