import { Accordion, AccordionControl, ActionIcon, Box, Button, Card, CardSection, Chip, Group, Input, Paper, Popover, Rating, ScrollArea, Stack, Text, Title } from "@mantine/core"
import { IconQuestionMark } from "@tabler/icons-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Suggestion } from "../Elements/Suggestion";

export function SuggestionsPanel() {
    const { t } = useTranslation();

    const [searchTerm, setSearchTerm] = useState('');

    // Temp Templates
    const templates = [
        { name: "SEO Report", help: "" },
        { name: "Images for Portugal Tourism", help: "" },
        { name: "Copy about Finance", help: "" },
    ]

    const getTemplatesToShow = () => {
        templates.sort((a, b) => a.name.localeCompare(b.name));

        return templates.filter(t => {
            return t.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        })
    }


    return (
        <Stack gap={'xl'} my={"md"}>
            <Title order={3}>Suggestions</Title>
            <Input
                hiddenFrom="sm"
                size='sm'
                placeholder={t("search")}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <Stack gap={'md'}>
                <Accordion variant="" chevron="" styles={{
                    content: {
                        paddingLeft: "0",
                        paddingRight: "0"
                    }
                }}>
                    {
                        getTemplatesToShow().map(item => {
                            return (
                                <Suggestion name={item.name} />
                            )
                        })
                    }
                </Accordion>

            </Stack>
        </Stack>
    )
}