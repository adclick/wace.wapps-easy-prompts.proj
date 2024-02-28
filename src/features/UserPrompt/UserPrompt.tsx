import { Group, Stack } from "@mantine/core";
import { FC } from "react";
import UserPromptOptionsSwitcher from "./UserPromptOptionsSwitcher/UserPromptOptionsSwitcher";
import UserPromptInput from "./UserPromptInput/UserPromptInput";

const UserPrompt: FC = () => {
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
                    <UserPromptOptionsSwitcher />
                    <UserPromptInput />
                </Stack>
            </Group>
        </Group>
    )
}

export default UserPrompt;