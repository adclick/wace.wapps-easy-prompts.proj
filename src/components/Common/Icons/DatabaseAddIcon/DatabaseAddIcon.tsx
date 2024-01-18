import { ActionIcon, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './DatabaseAddIcon.module.css'

interface DatabaseAddIcon {
    onClick: any
}

export function DatabaseAddIcon({ onClick }: DatabaseAddIcon) {
    return (
        <Tooltip label={"Filters"}>
            <ActionIcon className={classes.icon} size="lg" onClick={onClick} variant="transparent">
                {
                    iconAdd("md")
                }
            </ActionIcon>
        </Tooltip>
    )
}