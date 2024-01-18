import { ActionIcon, Tooltip } from "@mantine/core";
import { iconSideBar } from "../../../../utils/iconsUtils";
import classes from './NavbarToggleIcon.module.css'

interface NavbarToggleIcon {
    navbarOpened: boolean,
    navbarToggle: any
}

export function NavbarToggleIcon({ navbarOpened, navbarToggle }: NavbarToggleIcon) {
    const tooltip = navbarOpened ? "Close navbar" : "Open navbar";

    return (
        <Tooltip label={tooltip}>
            <ActionIcon className={classes.icon} size="lg" onClick={navbarToggle} variant="transparent">
                {
                    iconSideBar("md")
                }
            </ActionIcon>
        </Tooltip>
    )
}