import { Button, Popover } from "@mantine/core";
import { PromptRequest } from "../../../../model/PromptRequest";
import { getTechnologyIcon } from "../../../../utils/iconsUtils";
import classes from './ThreadInfoButton.module.css';

interface ThreadInfoButton {
    promptRequest: PromptRequest
}

export function ThreadInfoButton({ promptRequest }: ThreadInfoButton) {

    return (
        <Popover position="top-end">
            <Popover.Target>
                <Button
                    className={classes.button}
                    size="xs"
                    variant="transparent"
                    leftSection={getTechnologyIcon(promptRequest.technology.slug, 14)}
                >
                    {promptRequest.provider.model_name}
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                asdf
            </Popover.Dropdown>
        </Popover>

    )
}