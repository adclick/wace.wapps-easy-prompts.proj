import { ActionIcon } from "@mantine/core"
import { FC, MouseEvent, ReactNode } from "react"
import { Size } from "../../../../utils/uiUtils";

interface IconButtonProps {
    size?: Size;
    color?: string;
    variant?: 'filled' | 'transparent' | 'subtle';
    icon: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const IconButton: FC<IconButtonProps> = ({
    size = Size.md,
    color = 'blue',
    variant = 'transparent',
    icon,
    onClick,
    className
}: IconButtonProps) => {
    return (
        <ActionIcon
            onClick={onClick}
            size={size}
            variant={variant}
            color={color}
            className={className}
        >
            {icon}
        </ActionIcon>
    )
}

export default IconButton;