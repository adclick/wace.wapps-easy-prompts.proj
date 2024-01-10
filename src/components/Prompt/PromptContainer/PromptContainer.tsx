import { Group, Stack } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { PromptOptionsMenu } from "../PromptOptionsMenu/PromptOptionsMenu";
import { useModifiersSelected } from "../../../context/ModifiersSelectedContext";
import { PromptModifiersList } from "./PromptModifiersList/PromptModifiersList";

export function PromptContainer() {
    const { modifiersSelected } = useModifiersSelected();

    return (
        <Stack
            gap={'sm'}
            pos={"absolute"}
            bottom={"0"}
            w={"100%"}
            py={"md"}
            px={"md"}
        >
            <Group>
                {
                    modifiersSelected.length > 0 && <PromptModifiersList />
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