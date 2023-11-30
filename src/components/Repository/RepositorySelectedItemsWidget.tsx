import { ActionIcon, Box, Button, Chip, Group, Indicator, Popover, Text, rem } from "@mantine/core";
import { RepositoryItem } from "../../model/RepositoryItem";
import { IconInfoCircle, IconPrompt, IconTemplate, IconX } from "@tabler/icons-react";

interface RepositorySelectedItemsWidget {
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any
}

export function RepositorySelectedItemsWidget({
    repositorySelectedItems,
    setRepositorySelectedItems
}: RepositorySelectedItemsWidget) {
    let selected = <></>;

    if (repositorySelectedItems.length > 0) {
        selected = (
            <Group>
                <Popover>
                    <Popover.Target>
                        <Button variant="transparent" color={repositorySelectedItems[0].color}>
                            <Text>{repositorySelectedItems.length} {repositorySelectedItems[0].type} selected</Text>
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        {
                            repositorySelectedItems.map(item => {
                                return (
                                    <Text size="xs">{item.name}</Text>
                                )
                            })
                        }
                    </Popover.Dropdown>
                </Popover>
            </Group>
        )
    }

    return (
        <Group justify="space-between" my={"xs"}>
            <Group>
                <Text>Found:</Text>
                <Text>13</Text>
            </Group>

            {selected}
        </Group>
    )
}