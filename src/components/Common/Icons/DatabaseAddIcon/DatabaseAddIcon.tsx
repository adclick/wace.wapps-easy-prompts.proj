import { ActionIcon, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";

interface DatabaseAddIcon {
    onClick: any
}

export function DatabaseAddIcon({ onClick }: DatabaseAddIcon) {
    return (
        <Tooltip label={"Filters"}>
            <ActionIcon size="lg" onClick={onClick} variant="transparent">
                {
                    iconAdd("sm")
                }
            </ActionIcon>
        </Tooltip>
    )
}