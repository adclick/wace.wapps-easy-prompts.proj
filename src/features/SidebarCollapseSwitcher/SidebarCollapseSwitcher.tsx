import { ActionIcon, Tooltip } from "@mantine/core";
import { iconSideBar } from "../../utils/iconsUtils";
import classes from './SidebarCollapseSwitcher.module.css'
import { FC } from "react";

interface SidebarCollapseSwitcherProps {
    navbarOpened: boolean,
    navbarToggle: any
}

const SidebarCollapseSwitcher: FC<SidebarCollapseSwitcherProps> = ({
    navbarOpened,
    navbarToggle
}: SidebarCollapseSwitcherProps) => {
    const tooltip = navbarOpened ? "Close navbar" : "Open navbar";

    return (
        <Tooltip label={tooltip}>
            <ActionIcon className={classes.icon} size="lg" onClick={navbarToggle} variant="subtle" color="gray">
                {
                    iconSideBar("md")
                }
            </ActionIcon>
        </Tooltip>
    )
}

export default SidebarCollapseSwitcher;