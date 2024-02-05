import { Box } from "@mantine/core";
import { FC, ReactNode } from "react";

interface BoxProps {
    className?: string;
    children: ReactNode;
}

const BoxUI: FC<BoxProps> = ({
    className,
    children
}: BoxProps) => {
    return (
        <Box className={className}>
            {children}
        </Box>
    )
}

export default BoxUI;