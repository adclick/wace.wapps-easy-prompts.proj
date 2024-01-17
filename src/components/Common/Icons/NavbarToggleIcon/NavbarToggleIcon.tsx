import { ActionIcon, Tooltip } from "@mantine/core";
import { iconSideBar } from "../../../../utils/iconsUtils";

interface NavbarToggleIcon {
    navbarOpened: boolean,
    navbarToggle: any
}

export function NavbarToggleIcon({ navbarOpened, navbarToggle }: NavbarToggleIcon) {
    const tooltip = navbarOpened ? "Close navbar" : "Open navbar";

    return (
        <Tooltip label={tooltip}>
            <ActionIcon size="lg" onClick={navbarToggle} variant="transparent">
                {
                    iconSideBar("md")
                }
            </ActionIcon>
        </Tooltip>
    )
}