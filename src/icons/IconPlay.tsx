import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { FC } from "react";

interface IconPlayProps {
    size: number;
    stroke: number;
}

const IconPlay: FC<IconPlayProps> = ({size, stroke}: IconPlayProps) => {
    return (
        <IconPlayerPlayFilled size={size} stroke={stroke} />
    )
}

export default IconPlay;