import { Accordion, AccordionControl, ActionIcon, Box, Button, Card, CardSection, Chip, Drawer, Group, Input, Loader, Paper, Popover, Rating, ScrollArea, SegmentedControl, Stack, Text, Textarea, Title, rem } from "@mantine/core"
import { IconFilter, IconQuestionMark } from "@tabler/icons-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SuggestionItem } from "./SuggestionItem";
import { Suggestion } from "../../model/Suggestion";
import { SuggestionsFilters } from "./SuggestionsFilters";
import { RepositoryItem } from "../../model/RepositoryItem";


interface SuggestionsPromptsPanel {
    suggestions: Suggestion[],
    userPrompt: string,
    setUserPrompt: any,
    navbarToggle: any,
    repositoryItems: RepositoryItem[]
}

export function SuggestionsPromptsPanel({
    suggestions,
    userPrompt,
    setUserPrompt,
    navbarToggle,
    repositoryItems
}: SuggestionsPromptsPanel) {
    const { t } = useTranslation();

    const getPromptsToShow = () => {
        return repositoryItems.filter(item => {
            return item.name.toLowerCase().includes(userPrompt.toLocaleLowerCase());
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
                        getPromptsToShow().map((item: RepositoryItem) => {
                            return (
                                <SuggestionItem
                                    key={item.slug}
                                    repositoryItem={item}
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