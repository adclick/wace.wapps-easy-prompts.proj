import { ActionIcon, Button } from "@mantine/core"
import { FC, MouseEvent, ReactNode } from "react"

interface ButtonIconUIProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | "xl";
    color?: string;
    variant?: 'filled' | 'transparent' | 'subtle';
    icon: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const ButtonIconUI: FC<ButtonIconUIProps> = ({
    size = 'md',
    color = 'blue',
    variant = 'transparent',
    icon,
    onClick,
    className
}: ButtonIconUIProps) => {
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

export default ButtonIconUI;