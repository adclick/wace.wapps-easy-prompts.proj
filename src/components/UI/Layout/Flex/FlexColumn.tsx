import { FC } from "react";
import { Stack } from "@mantine/core";
import FlexProps from "./FlexProps";

const FlexColumn: FC<FlexProps> = ({
    gap,
    justify,
    align,
    children
}: FlexProps) => {
    return (
        <Stack
            gap={gap}
            justify={justify}
            align={align}
        >
            {children}
        </Stack>
    )
}

export default FlexColumn;