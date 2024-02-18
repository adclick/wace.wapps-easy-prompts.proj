import type { Meta, StoryObj } from '@storybook/react';

import IconButton from './IconButton';
import { IconCheck } from '@tabler/icons-react';
import { Size, Variant } from '../../../../enums';

const meta: Meta<typeof IconButton> = {
    component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
 export const Primary: Story = {
    args: {
      icon: (<IconCheck />),
      size: Size.md,
      variant: Variant.filled
    },
  };