import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";
import { Stack } from "@mantine/core";

interface ColumnProps {
    gap?: Size;
    children?: ReactNode
}

const Column: FC<ColumnProps> = ({
    gap,
    children
}: ColumnProps) => {
    return (
        <Stack gap={gap}>
            {children}
        </Stack>
    )
}

export default Column;