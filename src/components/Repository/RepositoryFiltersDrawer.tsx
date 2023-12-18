import { Drawer, Tooltip, Collapse, ScrollArea, Indicator, ActionIcon, Badge, Box, Burger, Button, Checkbox, Chip, Divider, Group, Loader, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem, Card, TextInput, Modal } from "@mantine/core";
import { RepositoryFilter } from "./RepositoryFilter";
import { RepositoryTypesFilter } from "./RepositoryTypesFilter";
import { RepositoryTechnologyFilter } from "./RepositoryTechnologyFilter";
import { RepositoryLanguageFilter } from "./RepositoryLanguageFilter";

interface RepositoryFiltersDrawer {
    opened: boolean,
    handle: any
    refreshRepository: any
}

export function RepositoryFiltersDrawer({
    opened,
    handle,
    refreshRepository
}: RepositoryFiltersDrawer) {
    return (
        <Drawer opened={opened} onClose={handle.close} title={<Text fw={500} size={"lg"}>Filters</Text>} size={350}>
            <Stack gap={"xl"} my={"xs"}>
                <RepositoryLanguageFilter refreshRepository={refreshRepository} />
                <RepositoryFilter refreshRepository={refreshRepository} />
                <RepositoryTechnologyFilter refreshRepository={refreshRepository} />
                <RepositoryTypesFilter refreshRepository={refreshRepository} />
            </Stack>
        </Drawer>

    )
}