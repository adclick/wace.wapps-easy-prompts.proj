import { ActionIcon, Tooltip } from "@mantine/core";
import { iconAdd } from "../../../../utils/iconsUtils";
import classes from './DatabaseAddIcon.module.css';

interface DatabaseAddIcon {
    onClick: any,
    createItemOpened: boolean
}

export function DatabaseAddIcon({onClick, createItemOpened}: DatabaseAddIcon) {
    const variant = createItemOpened ? "light" : "subtle";

    return (
        <Tooltip label={"Create"}>
            <ActionIcon
                className={classes.icon}
                size="lg"
                onClick={onClick}
                variant={variant}
                color="gray"
            >
                {
                    iconAdd("md")
                }
            </ActionIcon>
        </Tooltip>
    );
}