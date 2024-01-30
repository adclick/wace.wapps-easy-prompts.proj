import { Box, Group, Stack } from "@mantine/core";
import { PromptTextInput } from "../PromptTextInput/PromptTextInput";
import { PromptPlayButton } from "../PromptPlayButton/PromptPlayButton";
import { PromptModifiersList } from "../PromptModifiersList/PromptModifiersList";
import { PromptModeSwitcher } from "../PromptModeSwitcher/PromptModeSwitcher";
import { PromptTemplatesList } from "../PromptTemplatesList/PromptTemplatesList";
import { DatabaseAddIcon } from "../../Common/Icons/DatabaseAddIcon/DatabaseAddIcon";

export function PromptContainer() {
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
                    <PromptModeSwitcher />
                    <Group w={"100%"} >
                        <PromptTextInput />
                        <Box pos={"absolute"} left={28}>
                            <DatabaseAddIcon />
                        </Box>
                        <PromptModifiersList />
                        <PromptTemplatesList />
                        <PromptPlayButton />
                    </Group>
                </Stack>
            </Group>
        </Group>
    )
}