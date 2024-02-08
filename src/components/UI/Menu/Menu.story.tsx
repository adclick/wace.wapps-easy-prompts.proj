import type { Meta, StoryObj } from '@storybook/react';

import Menu from './Menu';

const meta: Meta<typeof Menu> = {
    component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

 export const Default: Story = {
    args: {
        target: <button>Menu</button>,
        items: [
            {
                id: 1,
                label: "Menu 1",
                onClick: () => console.log("menu 1"),
            },
            {
                id: 2,
                label: "Menu 2",
                onClick: () => console.log("menu 2"),
            }
        ]
    },
  };