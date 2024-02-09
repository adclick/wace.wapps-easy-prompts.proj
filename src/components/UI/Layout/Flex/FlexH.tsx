import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";
import { Group } from "@mantine/core";

interface FlexHProps {
    gap?: Size;
    justify?: string;
    children?: ReactNode
}

const FlexH: FC<FlexHProps> = ({
    gap,
    justify,
    children
}: FlexHProps) => {
    return (
        <Group gap={gap} justify={justify}>
            {children}
        </Group>
    )
}

export default FlexH;