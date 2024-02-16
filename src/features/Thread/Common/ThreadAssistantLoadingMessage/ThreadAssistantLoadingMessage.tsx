import { Group, Loader, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { EasyPromptsAvatar } from "../../../../components/Common/EasyPromptsAvatar/EasyPromptsAvatar";

const ThreadAssistantLoadingMessage: FC= () => {
    return (
        <Group w={"100%"} align="flex-start" wrap="nowrap">
            <EasyPromptsAvatar size="sm" />
            <Stack gap={"xs"}>
                <Text size="sm" fw={700}>EasyPrompts</Text>
                <Loader size={"xs"} type="dots" />
            </Stack>
        </Group>
    )
}

export default ThreadAssistantLoadingMessage;