import { Card, Group, Transition } from "@mantine/core";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";

interface PromptOptionsContainer {
    optionsOpened: boolean
}

export function PromptOptionsContainer({ optionsOpened }: PromptOptionsContainer) {
    return (
        <Transition mounted={optionsOpened} transition={"slide-up"} duration={200} timingFunction="ease" keepMounted>
            {styles =>
                <Card style={styles} withBorder >
                    <Group>
                        <PromptOptionsTechnologiesField />
                        <PromptOptionsProvidersField />
                    </Group>
                </Card>
            }
        </Transition>
    )
}