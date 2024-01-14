import { Stack } from "@mantine/core";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { PromptOptionsModesField } from "../PromptOptionsModesField/PromptOptionsModesField";

export function PromptOptionsContainer() {
    return (
        <Stack>
            <PromptOptionsModesField />
            <PromptOptionsTechnologiesField />
            <PromptOptionsProvidersField />
        </Stack>
    )
}