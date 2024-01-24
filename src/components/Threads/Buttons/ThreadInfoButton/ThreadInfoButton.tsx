import { Button, Popover, Text } from "@mantine/core";
import { PromptRequest } from "../../../../model/PromptRequest";
import { IconSparkles, IconTemplate } from "@tabler/icons-react";

interface ThreadInfoButton {
    promptRequest: PromptRequest
}

export function ThreadInfoButton({ promptRequest }: ThreadInfoButton) {
    const modifiers = promptRequest.metadata.modifiers;
    const templates = promptRequest.metadata.templates;

    if (modifiers.length <= 0 && templates.length <= 0) return <></>;

    if (templates.length > 0) {
        return (
            <Popover position="top">
                <Popover.Target>
                    <Button size="compact-xs" variant="transparent" color="gray" leftSection={<IconTemplate size={16} />}>
                        Selected templates
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
                        Selected modifiers
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