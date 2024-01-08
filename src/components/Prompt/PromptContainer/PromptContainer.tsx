import { Group, Stack } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { PromptOptionsMenu } from "../PromptOptionsMenu/PromptOptionsMenu";

export function PromptContainer() {
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
                <PromptTextInput />
                <PromptOptionsMenu />
                <PromptPlayButton />
            </Group>
        </Stack>
    )
}