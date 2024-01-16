import { Group, Stack } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { PromptModifiersList } from "../PromptModifiersList/PromptModifiersList";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { ThreadsScrollToBottom } from "../../Threads/ThreadsScrollToBottom/ThreadsScrollToBottom";
import { PromptModeSwitcher } from "../PromptModeSwitcher/PromptModeSwitcher";
import { PromptTemplateInfo } from "../PromptTemplateInfo/PromptTemplateInfo";

export function PromptContainer() {
    const { selectedModifiers } = useSelectedModifiers();

    return (
        <Stack
            gap={"xs"}
            pos={"absolute"}
            bottom={"0"}
            w={"100%"}
            py={"md"}
            px={"md"}
        >
            <PromptModeSwitcher />
            <ThreadsScrollToBottom />
            <Group w={"100%"} >
                <PromptTextInput />
                <PromptModifiersList />
                <PromptTemplateInfo />
                <PromptPlayButton />
            </Group>
        </Stack>
    )
}