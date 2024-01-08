import { Card, Group, Stack } from "@mantine/core";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";

export function PromptOptionsContainer() {
    return (
        <Stack>
            <PromptOptionsTechnologiesField />
            <PromptOptionsProvidersField />
        </Stack>
    )
}