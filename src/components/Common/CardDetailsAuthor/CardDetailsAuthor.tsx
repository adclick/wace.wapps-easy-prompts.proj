import { Group, Text } from "@mantine/core";
import { Modifier } from "../../../model/Modifier";
import { Prompt } from "../../../model/Prompt";
import { Template } from "../../../model/Template";
import { IconClock, IconUser } from "@tabler/icons-react";

interface CardDetailsAuthor {
    item: Prompt | Modifier | Template,
}

export function CardDetailsAuthor({ item }: CardDetailsAuthor) {
    const date = new Date(item.created_at)
    const formattedDate = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB')}`;

    return (
        <Group justify="space-between">
            <Group gap={"xs"}>
                <IconUser size={14} />
                <Text size="xs">{item.user.username}</Text>
            </Group>
            <Group gap={"xs"}>
                <IconClock size={14} />
                <Text size="xs">{formattedDate}</Text>
            </Group>
        </Group>
    )
}