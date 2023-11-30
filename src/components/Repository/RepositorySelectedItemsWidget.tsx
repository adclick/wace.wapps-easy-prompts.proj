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
                <Text>Selected:</Text>
                <Popover>
                    <Popover.Target>
                        <Indicator inline label={repositorySelectedItems.length} color="red">
                            <ActionIcon size={"sm"}>
                                <IconPrompt style={{ width: "75%", height: "75%" }} />
                            </ActionIcon>
                        </Indicator>
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

    // let output = (
    //     <Group my={"xs"}>
    //         <IconInfoCircle style={{ width: rem(20), height: rem(20) }} />
    //         <Text size="sm">No Items Selected</Text>
    //     </Group>
    // );




    // // Prompt & Template Selected
    // if (repositorySelectedItems.length === 1) {
    //     const item = repositorySelectedItems[0];

    //     output = (
    //         <Group wrap="nowrap" justify="space-between" my={"xs"}>
    //             <Group gap={"xs"}>
    //                 {
    //                     item.type === "prompt"
    //                         ? <IconPrompt style={{ width: rem(20), height: rem(20) }} />
    //                         : <IconTemplate style={{ width: rem(20), height: rem(20) }} />
    //                 }

    //                 <Text w={250} size="sm" truncate>
    //                     {item.name}
    //                 </Text>
    //             </Group>
    //             <ActionIcon onClick={() => setRepositorySelectedItems([])} size={"sm"} variant="transparent">
    //                 <IconX style={{ width: rem(20), height: rem(20) }} />
    //             </ActionIcon>
    //         </Group>
    //     )
    // }
}