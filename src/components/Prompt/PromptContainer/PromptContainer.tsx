import { Box, Group, SegmentedControl, Stack } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { PromptOptionsMenu } from "../PromptOptionsMenu/PromptOptionsMenu";
import { PromptModifiersList } from "../PromptModifiersList/PromptModifiersList";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { PromptOptionsContainer } from "../PromptOptionsContainer/PromptOptionsContainer";

export function PromptContainer() {
    const { selectedModifiers } = useSelectedModifiers();

    return (
        <Stack
            gap={'sm'}
            pos={"absolute"}
            bottom={"0"}
            w={"100%"}
            py={"md"}
            px={"md"}
        >
            <Group justify="space-between">
                {
                    selectedModifiers.length > 0 && <PromptModifiersList />
                }
            </Group>
            <Group w={"100%"} >
                <PromptTextInput />
                <PromptOptionsMenu />
                <PromptPlayButton />
            </Group>
        </Stack>
    )
}