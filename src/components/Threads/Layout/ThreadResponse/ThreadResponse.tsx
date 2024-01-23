import { Avatar, Group, Loader, Stack, Text } from "@mantine/core";
import favicon from "../../../../../favicon.svg";
import { iconPlay } from "../../../../utils/iconsUtils";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";

interface ThreadResponse {
    response: any,
    color: string
}
export function ThreadResponse({ response, color }: ThreadResponse) {
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
                        : <Loader color={color} size={"xs"} type="dots" />
                }

            </Stack>
        </Group>
    )
}