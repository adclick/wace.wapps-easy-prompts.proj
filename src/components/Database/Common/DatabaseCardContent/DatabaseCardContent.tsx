import { Button, Center, Group, Stack, Text } from "@mantine/core";
import { IconClock, IconUser } from "@tabler/icons-react";
import dateUtils from "../../../../utils/dateUtils";
import { Prompt } from "../../../../model/Prompt";
import { Template } from "../../../../model/Template";
import { Modifier } from "../../../../model/Modifier";
import classes from './DatabaseCardContent.module.css'

interface DatabaseCardContent {
    item: Prompt | Template | Modifier,
    detailsHandle: any
}

export function DatabaseCardContent({ item, detailsHandle }: DatabaseCardContent) {
    return (
        <Stack>
            {
                item.description !== "" &&
                <Text size="xs">{item.description}</Text>
            }
            <Center>
                <Button
                    className={classes.readMore}
                    variant="transparent"
                    size="xs"
                    onClick={detailsHandle.open}
                >
                    Read more
                </Button>
            </Center>
            <Group justify="space-between">
                <Group gap={"xs"}>
                    <IconUser size={12} />
                    <Text size="xs">{item.user.username}</Text>
                </Group>
                <Group gap={"xs"}>
                    <IconClock size={12} />
                    <Text size="xs">{dateUtils.timeAgo(new Date(item.created_at))}</Text>
                </Group>
            </Group>
        </Stack>
    )
}