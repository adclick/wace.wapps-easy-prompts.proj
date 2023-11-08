import { Box, Divider, Group, Title } from "@mantine/core";

export function NavbarFooter() {
    return (
        <Box>
            <Divider h={'xs'} />
            <Group justify='space-between' my={"sm"}>
                <Title order={4}>Operation Cost</Title>
                <Title order={4} c={"teal"}>Free</Title>
            </Group>
        </Box>
    )
}