import { Group, Stack } from "@mantine/core";
import { ChatPromptTechnologiesMenu } from "../ChatPromptTechnologiesMenu/ChatPromptTechnologiesMenu";
import { ChatPromptOptionsMenu } from "../ChatPromptOptionsMenu/ChatPromptOptionsMenu";
import { ChatPromptTextInput } from "../ChatPromptTextInput/ChatPromptTextInput";
import { ChatPromptPlayButton } from "../ChatPromptPlayButton/ChatPromptPlayButton";

export function ChatPromptContainer() {
    return (
        <Stack
            gap={'sm'}
            pos={"absolute"}
            bottom={"0"}
            w={"100%"}
            py={"md"}
            px={"md"}
        >
            <Group w={"100%"} >
                <ChatPromptTextInput />
                <ChatPromptTechnologiesMenu />
                <ChatPromptOptionsMenu />
                <ChatPromptPlayButton />
            </Group>
        </Stack>
    )
}