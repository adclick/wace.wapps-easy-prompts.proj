import { Accordion, AccordionControl, ActionIcon, Box, Button, Card, CardSection, Chip, Drawer, Group, Input, Loader, Paper, Popover, Rating, ScrollArea, SegmentedControl, Stack, Text, Textarea, Title, rem } from "@mantine/core"
import { IconFilter, IconQuestionMark } from "@tabler/icons-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Suggestion } from "./Suggestion";
import { UsedPrompt } from "../../model/UsedPrompt";
import { SuggestionsFilters } from "./SuggestionsFilters";


interface SuggestionsPromptsPanel {
    usedPrompts: UsedPrompt[],
    userPrompt: string,
    setUserPrompt: any,
    navbarToggle: any,
}

export function SuggestionsPromptsPanel({
    usedPrompts,
    userPrompt,
    setUserPrompt,
    navbarToggle,
}: SuggestionsPromptsPanel) {
    const { t } = useTranslation();

    const getPromptsToShow = () => {
        return usedPrompts.filter(usedPrompt => {
            return usedPrompt.prompt.toLowerCase().includes(userPrompt.toLocaleLowerCase());
        })
    }

    return (
        <Stack gap={'xl'} mb={"md"}>

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