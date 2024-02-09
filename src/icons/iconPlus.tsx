import { IconPlus as TablerIconPlus } from "@tabler/icons-react";
import { FC } from "react";

interface IconPlusProps {
    size: number;
    stroke: number;
}

export const IconPlus: FC<IconPlusProps> = ({size, stroke}: IconPlusProps) => {
    return (
        <TablerIconPlus size={size} stroke={stroke} />
    )
}