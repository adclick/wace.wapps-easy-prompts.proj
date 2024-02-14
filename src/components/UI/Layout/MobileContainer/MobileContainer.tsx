import { Box } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";

interface MobileContainerProps {
    children: ReactNode
}

const MobileContainer: FC<MobileContainerProps> = ({
    children
}: MobileContainerProps) => {
    return (
        <Box hiddenFrom={Size.sm}>
            {children}
        </Box>
    )
}

export default MobileContainer;