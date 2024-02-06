import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";
import { Group } from "@mantine/core";

interface FlexHProps {
    gap?: Size;
    children?: ReactNode
}

const FlexH: FC<FlexHProps> = ({
    gap,
    children
}: FlexHProps) => {
    return (
        <Group gap={gap}>
            {children}
        </Group>
    )
}

export default FlexH;