import { Button, Checkbox, Divider, Drawer, Group, SegmentedControl, Stack, Title, rem } from "@mantine/core";
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
        <Drawer opened={filtersOpened} onClose={closeFilters} title={<Title order={3}>Filters</Title>} size={"350px"}>
            <Stack gap={"md"} my={"md"}>
                <Stack gap={"md"}>
                    <Title order={5}>Type</Title>
                    <Stack gap={"xs"}>
                        <Checkbox radius={"sm"} defaultChecked label="Prompts" />
                        <Checkbox radius={"sm"} defaultChecked label="Templates" />
                    </Stack>
                </Stack>
                <Divider />
                <Group mt={0} justify="space-between">
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