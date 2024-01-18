import { ActionIcon, Tooltip } from "@mantine/core";
import { iconFilter, iconFilterFilled } from "../../../../utils/iconsUtils";
import classes from './FiltersToggleIcon.module.css';

interface FiltersToggleIcon {
    onClick: any,
    filled: boolean
}

export function FiltersToggleIcon({ onClick, filled }: FiltersToggleIcon) {
    return (
        <Tooltip label={"Filters"}>
            <ActionIcon className={classes.icon} size="md" onClick={onClick} variant="transparent">
                {
                    filled ? iconFilterFilled("xs") : iconFilter("xs")
                }
            </ActionIcon>
        </Tooltip>
    )
}