import { Avatar, Group, Loader, Stack, Text } from "@mantine/core";
import favicon from "../../../../../favicon.svg";
import { iconPlay } from "../../../../utils/iconsUtils";

interface ThreadResponse {
    response: any,
    color: string
}
export function ThreadResponse({ response, color }: ThreadResponse) {
    return (
        <Group w={"100%"} align="flex-start" wrap="nowrap">
            <Avatar color={color} variant="filled" size={"sm"} src={null} alt="no image here">
                {iconPlay(14)}
            </Avatar>
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