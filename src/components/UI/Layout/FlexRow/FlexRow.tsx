import { FC, ReactNode } from "react";
import { Group } from "@mantine/core";
import { FlexJustify, Size } from "../../../../enums";
import FlexAlign from "../../../../enums/FlexAlign";
import FlexWrap from "../../../../enums/FlexWrap";

interface FlexRowProps {
    gap?: Size;
    justify?: FlexJustify;
    align?: FlexAlign;
    wrap?: FlexWrap;
    children?: ReactNode
}

const FlexRow: FC<FlexRowProps> = ({
    gap,
    justify,
    align,
    wrap,
    children
}: FlexRowProps) => {
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