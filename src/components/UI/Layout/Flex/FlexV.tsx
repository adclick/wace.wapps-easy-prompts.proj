import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";
import { Stack } from "@mantine/core";

interface FlexVProps {
    gap?: Size;
    children?: ReactNode
}

const FlexV: FC<FlexVProps> = ({
    gap,
    children
}: FlexVProps) => {
    return (
        <Stack gap={gap}>
            {children}
        </Stack>
    )
}

export default FlexV;