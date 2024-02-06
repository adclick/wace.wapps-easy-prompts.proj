import { Group, Stack } from "@mantine/core";
import { PromptModeSwitcher } from "../PromptModeSwitcher/PromptModeSwitcher";
import UserPrompt from "../../../features/UserPrompt/UserPrompt";

export function PromptContainer() {
    return (
        <Group justify="center" h={"100%"} align="flex-end">
            <Group pos={"relative"} w={"800"}>
                <Stack
                    gap={"md"}
                    w={"100%"}
                    pos={"absolute"}
                    bottom={"0"}
                    py={"md"}
                    px={"md"}
                >
                    <PromptModeSwitcher />
                    
                    <UserPrompt />
                </Stack>
            </Group>
        </Group>
    )
}