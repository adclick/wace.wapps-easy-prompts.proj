import { Group, Stack } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { PromptOptionsMenu } from "../PromptOptionsMenu/PromptOptionsMenu";
import { PromptModifiersList } from "../PromptModifiersList/PromptModifiersList";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";

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
            {
                selectedModifiers.length > 0 && <PromptModifiersList />
            }
            <Group w={"100%"} >
                <PromptTextInput />
                <PromptOptionsMenu />
                <PromptPlayButton />
            </Group>
        </Stack>
    )
}