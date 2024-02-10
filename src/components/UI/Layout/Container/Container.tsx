import { Box } from "@mantine/core";
import { FC, ReactNode } from "react";

interface ContainerProps {
    className?: string;
    children: ReactNode;
}

const Container: FC<ContainerProps> = ({
    className,
    children
}: ContainerProps) => {
    return (
        <Box className={className}>
            {children}
        </Box>
    )
}

export default Container;