import { Button, Checkbox, Chip, Divider, Drawer, Group, SegmentedControl, Select, Stack, Text, Title, rem } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

interface SuggestionsFilters {
    filtersOpened: boolean,
    closeFilters: any
}

export function SuggestionsFilters({
    filtersOpened,
    closeFilters
}: SuggestionsFilters) {
    return (
        <Drawer
            opened={filtersOpened}
            onClose={closeFilters}
            title={<Text fw={700} size="xl">Filters</Text>}
            size={"350px"}
        >
            <Stack gap={"md"}>
                <Stack gap={"md"} my={"lg"}>
                    <Text>Types</Text>
                    <Stack>
                        <Checkbox radius={"sm"} defaultChecked label="Prompts" />
                        <Checkbox radius={"sm"} defaultChecked label="Templates" />
                        <Checkbox radius={"sm"} defaultChecked label="Modifiers" />

                    </Stack>
                </Stack>
                <Divider />
                <Group justify="space-between">
                    <Button
                        px={0}
                        variant="transparent"
                        size="sm"
                        leftSection={<IconReload style={{ width: rem(16), height: rem(16) }} />}
                    >
                        Reset
                    </Button>
                </Group>
            </Stack>
        </Drawer>
    )
}