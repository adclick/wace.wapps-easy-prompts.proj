import { Accordion, Box, Center, Loader, Stack } from "@mantine/core"
import { Craft } from "../Craft/Craft";
import { RepositoryItem } from "../../../model/RepositoryItem";
import { Thread } from "../../../model/Thread";
import { AIMediatorClient } from "../../../clients/AIMediatorClient";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useUser } from "../../../context/UserContext";
import { useCraftsQuery } from "../../../api/craftsApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";


interface CraftsContainer {
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

export function CraftsContainer({
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
}: CraftsContainer) {
    const { selectedFilters } = useSelectedFilters();
    const { user } = useUser();
    const { isLoading, data } = useCraftsQuery(selectedFilters);

    return (

        <Box>
            {
                isLoading &&
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
                        data !== undefined &&
                        data.data.data.map((item: RepositoryItem) => {
                            return (
                                <Craft
                                    key={item.id}
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