import { Accordion, AccordionControl, ActionIcon, Box, Button, Card, CardSection, Center, Chip, Drawer, Group, Input, Loader, LoadingOverlay, Paper, Popover, Rating, ScrollArea, SegmentedControl, Stack, Text, Textarea, Title, rem } from "@mantine/core"
import { useTranslation } from "react-i18next";
import { RepositoryItemRow } from "./RepositoryItemRow";
import { RepositoryItem } from "../../model/RepositoryItem";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Thread } from "../../model/Thread";
import { useFilters } from "../../context/FiltersContext";


interface RepositoryPanel {
    aiMediatorClient: AIMediatorClient,
    navbarToggle: any,
    repositoryItems: RepositoryItem[],
    setRepositoryItems: any
    repositorySearchTerm: string,
    refreshingRepository: boolean,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any,
    refreshRepository: any,
    openRepositoryItemDetailsSelected: any,
    threads: Thread[],
    setThreads: any
}

export function RepositoryPanel({
    aiMediatorClient,
    navbarToggle,
    repositoryItems,
    setRepositoryItems,
    refreshingRepository,
    repositorySelectedItems,
    setRepositorySelectedItems,
    refreshRepository,
    openRepositoryItemDetailsSelected,
    threads,
    setThreads
}: RepositoryPanel) {
    const {filters, setFilters} = useFilters();

    return (
        <Box>
            {
                refreshingRepository &&
                <Center my={"xs"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
                <Accordion variant="separated" chevron="" styles={{
                    chevron: {
                        display: "none"
                    }
                }}>

                    {
                        repositoryItems.map((item: RepositoryItem) => {
                            return (
                                <RepositoryItemRow
                                    key={`${item.type}-${item.id}`}
                                    repositoryItem={item}
                                    navbarToggle={navbarToggle}
                                    repositorySelectedItems={repositorySelectedItems}
                                    setRepositorySelectedItems={setRepositorySelectedItems}
                                    aiMediatorClient={aiMediatorClient}
                                    refreshRepository={refreshRepository}
                                    openRepositoryItemDetailsSelected={openRepositoryItemDetailsSelected}
                                    threads={threads}
                                    setThreads={setThreads}
                                />
                            )
                        })
                    }
                </Accordion>
            </Stack>
        </Box>
    )
}