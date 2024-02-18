import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';
import { IconExternalLink, IconLogout, IconUser } from '@tabler/icons-react';
import { Color, MenuType, Position } from '../../../enums';

const meta: Meta<typeof Menu> = {
    component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

 export const UserMenu: Story = {
    args: {
        target: <button>Menu</button>,
        position: Position.bottom,
        items: [
            {
                type: MenuType.button,
                id: 1,
                label: "User X",
                icon: <IconUser size={14} />,
                onClick: () => console.log("menu 1"),
            },
            {
                type: MenuType.link,
                id: 2,
                label: "External Link",
                icon: <IconExternalLink size={14} />,
                href: "https://google.com",
                targetBlank: true,
            },
            {
                type: MenuType.button,
                id: 3,
                label: "Logout",
                icon: <IconLogout size={14} />,
                onClick: () => console.log("logout"),
                color: Color.red
            }
        ]
    },
  };