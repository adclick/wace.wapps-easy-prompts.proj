import { Card, Group, Stack, Transition } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { useDisclosure } from "@mantine/hooks";
import { PromptOptionsMenu } from "../PromptOptionsMenu/PromptOptionsMenu";
import { PromptOptionsContainer } from "../PromptOptionsContainer/PromptOptionsContainer";

export function PromptContainer() {
    const [optionsOpened, optionsHandle] = useDisclosure(false);

    return (
        <Stack
            gap={'sm'}
            pos={"absolute"}
            bottom={"0"}
            w={"100%"}
            py={"md"}
            px={"md"}
        >
            <PromptOptionsContainer optionsOpened={optionsOpened} />          
             <Group w={"100%"} >
                <PromptTextInput />
                <PromptOptionsMenu optionsHandle={optionsHandle} />
                <PromptPlayButton />
            </Group>
        </Stack>
    )
}