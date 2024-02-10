import { FC, ReactNode } from "react";
import { Size } from "../../../../utils/uiUtils";
import { Group } from "@mantine/core";

interface RowProps {
    gap?: Size;
    justify?: string;
    align?: string;
    wrap?: 'wrap' | 'nowrap';
    children?: ReactNode
}

const Row: FC<RowProps> = ({
    gap,
    justify,
    align,
    wrap,
    children
}: RowProps) => {
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

export default Row;