import { FC, MouseEvent, ReactNode } from "react";
import { Menu as MantineMenu } from "@mantine/core";
import { Color, MenuType, Position } from "../../../enums";


export interface MenuItemProps {
    type: MenuType
    id: number | string;
    label?: ReactNode;
    icon?: ReactNode;
    color?: Color;
    targetBlank?: boolean;
    href?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface MenuProps {
    target: ReactNode,
    position?: Position,
    items: MenuItemProps[],
    width?: string
}

const Menu: FC<MenuProps> = ({ target, position, items, width }: MenuProps) => {
    return (
        <MantineMenu position={position} width={width}>
            <MantineMenu.Target>
                {target}
            </MantineMenu.Target>
            <MantineMenu.Dropdown>
                {
                    items.map(item => {
                        switch (item.type) {
                            case MenuType.button:
                                return (
                                    <MantineMenu.Item
                                        key={item.id}
                                        leftSection={item.icon}
                                        onClick={item.onClick}
                                        color={item.color}
                                    >
                                        {item.label}
                                    </MantineMenu.Item>
                                )
                            case MenuType.link:
                                return (
                                    <MantineMenu.Item
                                        key={item.id}
                                        leftSection={item.icon}
                                        href={item.href}
                                        color={item.color}
                                        component="a"
                                        target="_blank"
                                    >
                                        {item.label}
                                    </MantineMenu.Item>
                                )
                            case MenuType.divider:
                                return (
                                    <MantineMenu.Divider
                                        key={item.id}
                                        color={item.color}
                                    >
                                        {item.label}
                                    </MantineMenu.Divider>
                                )
                            default:
                                return <></>
                        }

                    })
                }
            </MantineMenu.Dropdown>
        </MantineMenu>
    )
}

export default Menu;