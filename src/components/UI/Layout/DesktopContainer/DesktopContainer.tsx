import { Box } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";

interface DesktopContainerProps {
    children: ReactNode
}

const DesktopContainer: FC<DesktopContainerProps> = ({
    children
}: DesktopContainerProps) => {
    return (
        <Box visibleFrom={Size.sm}>
            {children}
        </Box>
    )
}

export default DesktopContainer;