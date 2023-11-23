import { Accordion, AccordionControl, ActionIcon, Box, Button, Card, CardSection, Chip, Group, Input, Paper, Popover, Rating, ScrollArea, Stack, Text, Textarea, Title } from "@mantine/core"
import { IconQuestionMark } from "@tabler/icons-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Suggestion } from "./Suggestion";
import { UsedPrompt } from "../../model/UsedPrompt";

interface SuggestionsPanel {
    usedPrompts: UsedPrompt[],
    userPrompt: string,
    setUserPrompt: any,
    navbarToggle: any
}

export function SuggestionsPanel({
    usedPrompts,
    userPrompt,
    setUserPrompt,
    navbarToggle
}: SuggestionsPanel) {
    const { t } = useTranslation();

    const getPromptsToShow = () => {
        return usedPrompts.filter(usedPrompt => {
            return usedPrompt.prompt.toLowerCase().includes(userPrompt.toLocaleLowerCase());
        })
    }

    return (
        <Stack gap={'xl'} my={"md"}>
            {/* <Group align="flex-end">
                <Title order={4}>
                    Suggestions
                </Title>
            </Group> */}
            <Textarea
                placeholder={"Search"}
                autosize
                autoFocus
                minRows={1}
                maxRows={6}
                value={userPrompt}
                onChange={e => setUserPrompt(e.target.value)}
                hiddenFrom="sm"
            />
            <Stack gap={'md'}>
                <Accordion variant="" chevron="" styles={{
                    content: {
                        paddingLeft: "0",
                        paddingRight: "0"
                    }
                }}>
                    {
                        getPromptsToShow().map(usedPrompt => {
                            return (
                                <Suggestion
                                    key={usedPrompt.prompt}
                                    usedPrompt={usedPrompt}
                                    setUserPrompt={setUserPrompt}
                                    navbarToggle={navbarToggle}
                                />
                            )
                        })
                    }
                </Accordion>

            </Stack>
        </Stack>
    )
}