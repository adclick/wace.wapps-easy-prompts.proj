import { Card, Group, Stack, Transition } from "@mantine/core";
import { ChatPromptTechnologiesMenu } from "../ChatPromptTechnologiesMenu/ChatPromptTechnologiesMenu";
import { ChatPromptOptionsMenu } from "../ChatPromptOptionsMenu/ChatPromptOptionsMenu";
import { ChatPromptTextInput } from "../ChatPromptTextInput/ChatPromptTextInput";
import { ChatPromptPlayButton } from "../ChatPromptPlayButton/ChatPromptPlayButton";
import { ChatPromptProvidersField } from "../ChatPromptProvidersField/ChatPromptProvidersField";
import { ChatPromptTechnologiesField } from "../ChatPromptTechnologiesField/ChatPromptTechnologiesField";
import { useDisclosure } from "@mantine/hooks";

export function ChatPromptContainer() {
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
            <Transition
                mounted={optionsOpened}
                transition={"pop"}
                duration={400}
                timingFunction="ease"
            >
                {(styles) =>
                    <Card withBorder style={styles}>
                        <Group>
                            <ChatPromptTechnologiesField />
                            <ChatPromptProvidersField />
                        </Group>
                    </Card>
                }
            </Transition>
            <Group w={"100%"} >
                <ChatPromptTextInput />
                <ChatPromptOptionsMenu optionsHandle={optionsHandle} />
                <ChatPromptPlayButton />
            </Group>
        </Stack>
    )
}