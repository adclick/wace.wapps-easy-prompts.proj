import { Accordion, AccordionControl, ActionIcon, Box, Button, Card, CardSection, Center, Chip, Drawer, Group, Input, Loader, LoadingOverlay, Paper, Popover, Rating, ScrollArea, SegmentedControl, Stack, Text, Textarea, Title, rem } from "@mantine/core"
import { IconFilter, IconPlus, IconQuestionMark } from "@tabler/icons-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RepositoryItemRow } from "./RepositoryItemRow";
import { Suggestion } from "../../model/Suggestion";
import { RepositoryFilters } from "./RepositoryFilters";
import { RepositoryItem } from "../../model/RepositoryItem";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Filters } from "../../model/Filters";


interface RepositoryPanel {
    aiMediatorClient: AIMediatorClient,
    userPrompt: string,
    setUserPrompt: any,
    navbarToggle: any,
    repositoryItems: RepositoryItem[],
    setRepositoryItems: any
    repositorySearchTerm: string,
    refreshingRepository: boolean,
    filters: Filters,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any
}

export function RepositoryPanel({
    aiMediatorClient,
    setUserPrompt,
    navbarToggle,
    repositoryItems,
    setRepositoryItems,
    repositorySearchTerm,
    refreshingRepository,
    filters,
    repositorySelectedItems,
    setRepositorySelectedItems
}: RepositoryPanel) {
    const { t } = useTranslation();

    const getPromptsToShow = () => {
        return repositoryItems.filter(item => {
            return item.name.toLowerCase().includes(repositorySearchTerm.toLocaleLowerCase());
        })
    }

    const loadMore = async () => {
        const newRepositoryItems = await aiMediatorClient.getRepositoryItems(filters, aiMediatorClient.repositoryItemsLimit, repositoryItems.length);

        if (newRepositoryItems.length > 0) {
            setRepositoryItems([
                ...repositoryItems,
                ...newRepositoryItems
            ]);
        }
    }

    return (
        <Box>
            {
                refreshingRepository &&
                <Center my={"xs"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
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
                                    <RepositoryItemRow
                                        key={item.slug}
                                        repositoryItem={item}
                                        setUserPrompt={setUserPrompt}
                                        navbarToggle={navbarToggle}
                                        repositorySelectedItems={repositorySelectedItems}
                                        setRepositorySelectedItems={setRepositorySelectedItems}
                                    />
                                )
                            })
                        }
                    </Accordion>

                    <Center>
                        <Button onClick={loadMore} variant="subtle" fullWidth>
                            <IconPlus  />
                        </Button>
                    </Center>

                </Stack>
            </Stack>
        </Box>
    )
}