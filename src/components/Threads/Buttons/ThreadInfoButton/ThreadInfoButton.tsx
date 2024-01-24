import { Button, Popover } from "@mantine/core";
import { PromptRequest } from "../../../../model/PromptRequest";
import { getTechnologyIcon } from "../../../../utils/iconsUtils";
import classes from './ThreadInfoButton.module.css';
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";

interface ThreadInfoButton {
    promptRequest: PromptRequest
}

export function ThreadInfoButton({ promptRequest }: ThreadInfoButton) {

    return (
        <></>
        // <ProviderLabel technology={promptRequest.technology} provider={promptRequest.provider} />
        // <Button
        //     className={classes.button}
        //     size="compact-xs"
        //     variant="transparent"
        //     color={getPromptModeColor(getPromptModeByTechnology(promptRequest.technology))}
        //     leftSection={getTechnologyIcon(promptRequest.technology.slug, 14)}
        // >
        //     {promptRequest.provider.model_name}
        // </Button>

    )
}