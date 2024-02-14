import { Box } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Size } from "../../../../enums";

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