import { Select, Stack, Text } from "@mantine/core";

export function OrderField() {
    return (
        <Stack gap={"xs"}>
            <Text size="sm">Order by</Text>
            <Select
                size="xs"
                defaultValue={"Recent"}
                value={"Recent"}
                placeholder="Sorty"
                data={['Recent', 'Older', 'Name', 'Repository']}
            />
        </Stack>
    )
}