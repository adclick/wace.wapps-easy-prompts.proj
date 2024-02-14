import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";
import { Stack } from "@mantine/core";

interface FlexColumnProps {
    gap?: Size;
    children?: ReactNode
}

const FlexColumn: FC<FlexColumnProps> = ({
    gap,
    children
}: FlexColumnProps) => {
    return (
        <Stack gap={gap}>
            {children}
        </Stack>
    )
}

export default FlexColumn;