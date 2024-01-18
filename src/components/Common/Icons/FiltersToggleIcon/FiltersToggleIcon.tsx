import { ActionIcon, Tooltip } from "@mantine/core";
import classes from './FiltersToggleIcon.module.css';
import { iconAdjustmentsHorizontal } from "../../../../utils/iconsUtils";

interface FiltersToggleIcon {
    onClick: any,
}

export function FiltersToggleIcon({ onClick }: FiltersToggleIcon) {
    return (
        <Tooltip label={"Filters"}>
            <ActionIcon className={classes.icon} size="lg" onClick={onClick} variant="transparent">
                {
                    iconAdjustmentsHorizontal("md")
                }
            </ActionIcon>
        </Tooltip>
    )
}