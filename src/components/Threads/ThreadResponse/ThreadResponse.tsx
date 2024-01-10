import { Avatar, Box, Center, Group, Loader, Stack, Text } from "@mantine/core";
import favicon from "../../../favicon.svg";

interface ThreadResponse {
    response: any
}
export function ThreadResponse({ response }: ThreadResponse) {
    return (
        <Group w={"100%"} align="flex-start" wrap="nowrap">
            <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
            <Stack gap={"xs"}>
                <Text size="sm" fw={700}>EasyPrompts</Text>
                {
                    response
                        ? <Box style={{fontSize: "var(--mantine-font-size-sm)"}}>{response}</Box>
                        : <Loader size={"xs"} type="dots" />
                }
            </Stack>
        </Group>
    )
}