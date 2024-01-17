import { ActionIcon, Tooltip } from "@mantine/core";
import { iconFilter } from "../../../../utils/iconsUtils";

interface FiltersToggleIcon {
    onClick: any
}

export function FiltersToggleIcon({ onClick }: FiltersToggleIcon) {
    return (
        <Tooltip label={"Filters"}>
            <ActionIcon size="lg" onClick={onClick} variant="transparent">
                {
                    iconFilter("sm")
                }
            </ActionIcon>
        </Tooltip>
    )
}