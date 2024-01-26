import { ActionIcon, Tooltip } from "@mantine/core";
import classes from './FiltersToggleIcon.module.css';
import { iconAdjustmentsHorizontal } from "../../../../utils/iconsUtils";

interface FiltersToggleIcon {
    onClick: any,
    filtersOpened: boolean
}

export function FiltersToggleIcon({ onClick, filtersOpened }: FiltersToggleIcon) {
    const variant = filtersOpened ? "light" : "transparent";

    return (
        <Tooltip label={"Filters"}>
            <ActionIcon className={classes.icon} size="lg" onClick={onClick} variant={variant} color="gray">
                {
                    iconAdjustmentsHorizontal("md")
                }
            </ActionIcon>
        </Tooltip>
    )
}