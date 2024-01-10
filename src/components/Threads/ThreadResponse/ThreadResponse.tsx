import { ActionIcon, Avatar, Box, Center, Group, Loader, Stack, Text } from "@mantine/core";
import favicon from "../../../favicon.svg";
import { IconReload } from "@tabler/icons-react";

interface ThreadResponse {
    response: any,
    reloadButton: boolean
}
export function ThreadResponse({ response, reloadButton }: ThreadResponse) {
    return (
        <Group w={"100%"} align="flex-start" wrap="nowrap">
            <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
            <Stack gap={"xs"}>
                <Group>
                    <Text size="sm" fw={700}>EasyPrompts</Text>
                    {
                        reloadButton &&
                        <ActionIcon variant="subtle" size={"xs"}>
                            <IconReload size={12} />
                        </ActionIcon>
                    }
                </Group>
                {
                    response
                        ? <Box style={{ fontSize: "var(--mantine-font-size-sm)" }}>{response}</Box>
                        : <Loader size={"xs"} type="dots" />
                }
            </Stack>
        </Group>
    )
}