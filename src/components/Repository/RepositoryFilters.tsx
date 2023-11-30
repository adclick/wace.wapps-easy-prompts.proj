import { Button, Checkbox, Chip, Divider, Drawer, Group, SegmentedControl, Select, Stack, Text, Title, rem } from "@mantine/core";
import { IconCheck, IconReload } from "@tabler/icons-react";
import { Filters } from "../../model/Filters";
import { useState } from "react";

interface RepositoryFilters {
    filtersOpened: boolean,
    closeFilters: any,
    filters: Filters,
    setFilters: any,
    refreshRepository: any
}

export function RepositoryFilters({
    filtersOpened,
    closeFilters,
    filters,
    setFilters,
    refreshRepository
}: RepositoryFilters) {
    const [types, setTypes] = useState<string[]>(filters.types);

    const updateTypes = (value: any) => {
        setTypes(value);

        setFilters({
            ...filters,
            types: value
        });
    }

    const apply = () => {
        refreshRepository();
        closeFilters();
    }

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
                    <Checkbox.Group defaultValue={filters.types} value={types} onChange={updateTypes}>
                        <Stack>
                            <Checkbox value="prompts" label="Prompts" />
                            <Checkbox value="templates" label="Templates" />
                            <Checkbox value="modifiers" label="Modifiers" />
                        </Stack>
                    </Checkbox.Group>

                </Stack>
                <Divider />
                <Group justify="space-between">
                    <Button
                        px={0}
                        variant="transparent"
                        size="sm"
                        onClick={() => updateTypes(["prompts", "templates"])}
                        leftSection={<IconReload style={{ width: rem(16), height: rem(16) }} />}
                    >
                        Reset
                    </Button>
                    <Button
                        px={0}
                        variant="transparent"
                        size="sm"
                        onClick={apply}
                        leftSection={<IconCheck style={{ width: rem(16), height: rem(16) }} />}
                    >
                        Apply
                    </Button>
                </Group>
            </Stack>
        </Drawer>
    )
}