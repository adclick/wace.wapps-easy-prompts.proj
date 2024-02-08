import { FC, MouseEvent, ReactNode } from "react";
import { Menu as MantineMenu, MenuItem as MantineMenuItem } from "@mantine/core";

interface MenuProps {
    target: ReactNode
    items: MenuItemProps[]
}

interface MenuItemProps {
    id: number;
    label: ReactNode;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Menu: FC<MenuProps> = ({ target, items }: MenuProps) => {
    return (
        <MantineMenu>
            <MantineMenu.Target>
                {target}
            </MantineMenu.Target>
            <MantineMenu.Dropdown>
                {
                    items.map(item => {
                        return (
                            <MantineMenu.Item onClick={item.onClick} key={item.id}>
                                {item.label}
                            </MantineMenu.Item>
                        )
                    })
                }
            </MantineMenu.Dropdown>
        </MantineMenu>
    )
}

export default Menu;