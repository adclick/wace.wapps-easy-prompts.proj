import { Box, Center, SegmentedControl, rem } from "@mantine/core";
import { IconPrompt, IconTemplate } from "@tabler/icons-react";

export function SuggestionsSwitcher() {
    return (
        <SegmentedControl
            size="xs"
            data={[
                {
                    value: 'prompts',
                    label: (
                        <Center>
                            <IconPrompt style={{ width: rem(16), height: rem(16) }} />
                            <Box ml={10}>Prompts</Box>
                        </Center>
                    ),
                },
                {
                    value: 'templates',
                    label: (
                        <Center>
                            <IconTemplate style={{ width: rem(16), height: rem(16) }} />
                            <Box ml={10}>Templates</Box>
                        </Center>
                    ),
                },
            ]}
        />
    )
}