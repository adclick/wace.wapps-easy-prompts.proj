import { Accordion, Box, Center, Loader, Stack } from "@mantine/core"
import { RepositoryItemRow } from "./RepositoryItemRow";
import { RepositoryItem } from "../../model/RepositoryItem";
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Thread } from "../../model/Thread";


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
    return (
        <Box>
            {
                refreshingRepository &&
                <Center mb={"xl"}>
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