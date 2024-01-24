import { Button, Popover, Text } from "@mantine/core";
import { PromptRequest } from "../../../../model/PromptRequest";
import { getTechnologyIcon } from "../../../../utils/iconsUtils";
import classes from './ThreadInfoButton.module.css';
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
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
            <Popover>
                <Popover.Target>
                    <Button size="compact-xs" variant="transparent" color="gray" leftSection={<IconTemplate size={16} />}>
                        Selected templates
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    {
                        templates.map(m => {
                            return (
                                <Text>{m.title}</Text>
                            )
                        })
                    }
                </Popover.Dropdown>
            </Popover>
        )
    }

    if (modifiers.length > 0) {
        return (
            <Popover>
                <Popover.Target>
                    <Button size="compact-xs" variant="transparent" color="gray" leftSection={<IconSparkles size={16} />}>
                        Selected modifiers
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    {
                        modifiers.map(m => {
                            return (
                                <Text>{m.title}</Text>
                            )
                        })
                    }
                </Popover.Dropdown>
            </Popover>
        )
    }
}