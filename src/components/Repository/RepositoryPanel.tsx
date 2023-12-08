import { Accordion, AccordionControl, ActionIcon, Box, Button, Card, CardSection, Center, Chip, Drawer, Group, Input, Loader, LoadingOverlay, Paper, Popover, Rating, ScrollArea, SegmentedControl, Stack, Text, Textarea, Title, rem } from "@mantine/core"
import { IconFilter, IconPlus, IconQuestionMark } from "@tabler/icons-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RepositoryItemRow } from "./RepositoryItemRow";
import { Suggestion } from "../../model/Suggestion";
import { RepositoryItem } from "../../model/RepositoryItem";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Filters } from "../../model/Filters";
import { Thread } from "../../model/Thread";


interface RepositoryPanel {
    aiMediatorClient: AIMediatorClient,
    setUserPrompt: any,
    navbarToggle: any,
    repositoryItems: RepositoryItem[],
    setRepositoryItems: any
    repositorySearchTerm: string,
    refreshingRepository: boolean,
    filters: Filters,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any,
    refreshRepository: any,
    openRepositoryItemDetailsSelected: any,
    threads: Thread[],
    setThreads: any
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
    setRepositorySelectedItems,
    refreshRepository,
    openRepositoryItemDetailsSelected,
    threads,
    setThreads
}: RepositoryPanel) {
    const { t } = useTranslation();

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
            <Stack>
                {
                    repositoryItems.map((item: RepositoryItem) => {
                        return (
                            <RepositoryItemRow
                                key={`${item.type}-${item.id}`}
                                repositoryItem={item}
                                setUserPrompt={setUserPrompt}
                                navbarToggle={navbarToggle}
                                repositorySelectedItems={repositorySelectedItems}
                                setRepositorySelectedItems={setRepositorySelectedItems}
                                aiMediatorClient={aiMediatorClient}
                                refreshRepository={refreshRepository}
                                filters={filters}
                                openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
                                threads={threads}
                                setThreads={setThreads}
                            />
                        )
                    })
                }
            </Stack>
        </Box>
    )
}