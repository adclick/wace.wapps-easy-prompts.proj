import type { Meta, StoryObj } from '@storybook/react';

import CheckableAccordion from './CheckableAccordion';
import { ActionIcon, Badge, Checkbox, Group, Stack, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconPencil, IconTrash, IconWorld } from '@tabler/icons-react';

const meta: Meta<typeof CheckableAccordion> = {
	component: CheckableAccordion,
};

export default meta;
type Story = StoryObj<typeof CheckableAccordion>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
	args: {
		items: [
			{
				value: '1',
				header: (
					<Stack>
						<Group  justify="space-between" wrap="nowrap" align="center" pos={"relative"}>
							<Stack gap={0}>
								<Badge size="xs" variant="transparent" px={0} color="gray.9">
									repo
								</Badge>
								<Text size="xs" fw={500} lineClamp={1}>
									titulo
								</Text>
							</Stack>
							<Group wrap="nowrap">
								{
									<Group gap={4} wrap="nowrap">
										<ActionIcon size={"sm"} variant="transparent" color="gray">
											<IconPencil size={14} />
										</ActionIcon>
										<ActionIcon size={"sm"} variant="transparent" color="gray">
											<IconWorld size={14} />
										</ActionIcon>
										<ActionIcon size={"sm"} variant="transparent" color="gray">
											<IconTrash color="pink" size={14} />
										</ActionIcon>
									</Group>
								}
								<Checkbox
									value={'asdf'}
									size="sm"
									onClick={e => e.stopPropagation()}
								/>
							</Group>
						</Group>

					</Stack>
				),
				content: 'content'
			}
		]
	},
};