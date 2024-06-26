import { Button, Popover, Text } from "@mantine/core";
import { PromptRequest } from "../../../../models/PromptRequest";
import { IconSparkles, IconTemplate } from "@tabler/icons-react";
import { Modifier } from "../../../../models/Modifier";
import { Template } from "../../../../models/Template";

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
                        {templates.length}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    {
                        templates.map(m => {
                            return (
                                <Text key={m.id} size="xs">{m.title}</Text>
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
                    {modifiers.length}
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