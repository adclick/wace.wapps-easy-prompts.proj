import { Avatar, Center, Group, Loader, Stack, Text } from "@mantine/core";
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
                        ? <Text size="sm" style={{ whiteSpace: "pre-line" }}>{response}</Text>
                        : <Center><Loader size={"xs"} type="bars" mt={"lg"} /></Center>
                }
            </Stack>
        </Group>
    )
}