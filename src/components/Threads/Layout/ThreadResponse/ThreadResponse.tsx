import { Group, Loader, Stack, Text } from "@mantine/core";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";

interface ThreadResponse {
    response: any,
}
export function ThreadResponse({ response }: ThreadResponse) {
    return (
        <Group w={"100%"} align="flex-start" wrap="nowrap">
            <EasyPromptsAvatar size="sm" />
            <Stack gap={"xs"}>
                <Text size="sm" fw={700}>EasyPrompts</Text>
                {
                    response
                        ? <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                            {response}
                        </Stack>
                        : <Loader size={"xs"} type="dots" />
                }

            </Stack>
        </Group>
    )
}