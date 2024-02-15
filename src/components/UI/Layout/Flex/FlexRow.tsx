import { FC } from "react";
import { Group } from "@mantine/core";
import FlexProps from "./FlexProps";

const FlexRow: FC<FlexProps> = ({
    gap,
    justify,
    align,
    wrap,
    children
}: FlexProps) => {
    return (
        <Group
            gap={gap}
            justify={justify}
            align={align}
            wrap={wrap}
        >
            {children}
        </Group>
    )
}

export default FlexRow;