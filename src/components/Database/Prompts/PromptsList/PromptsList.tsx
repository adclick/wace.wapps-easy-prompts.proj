import { Accordion, Box, Button, Center, Loader, Paper, Stack, Text } from "@mantine/core";
import { Prompt } from "../../../../model/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";
import { useIntersection } from "@mantine/hooks";
import { RefObject } from "react";

interface PromptsList {
    promptsQuery: any,
    navbarMobileHandle: any,
    itemRef: any,
    entry: any,
    databaseListContainerRef: RefObject<HTMLDivElement>
}

export function PromptsList({ promptsQuery, navbarMobileHandle, databaseListContainerRef }: PromptsList) {
    const { ref, entry } = useIntersection({
        root: databaseListContainerRef.current,
        threshold: 1,
    });

    if (entry?.isIntersecting) {
        promptsQuery.fetchNextPage();
    }
    
    return (
        <Box>
            {
                promptsQuery.isLoading &&
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
                        promptsQuery.data !== undefined &&
                        promptsQuery.data.pages.map((page: any) => {

                            return page.map((prompt: Prompt, index: number) => {
                                const isTarget = index === 6;

                                return (
                                    <PromptCard
                                        key={prompt.id}
                                        itemRef={isTarget ? ref : undefined}
                                        prompt={prompt}
                                        navbarMobileHandle={navbarMobileHandle}
                                    />
                                )
                            })
                        })

                    }
                </Accordion>
                {
                    promptsQuery.isFetchingNextPage
                        ? <Center mb={"xl"}>
                            <Loader type="bars" size={"xs"} />
                        </Center>
                        : (!promptsQuery.hasNextPage && promptsQuery.data) &&
                        <Center mb={"xl"}>
                            <Text size="sm" fw={700}>Nothing more to load</Text>
                        </Center>
                }
                {/* <DatabaseLoadMoreButton itemQuery={promptsQuery} /> */}
            </Stack>
        </Box>
    )
}