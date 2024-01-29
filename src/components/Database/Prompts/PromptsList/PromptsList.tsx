import { Accordion, Box, Button, Center, Loader, Paper, Stack, Text } from "@mantine/core";
import { Prompt } from "../../../../model/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";
import { useIntersection } from "@mantine/hooks";
import { RefObject, useEffect } from "react";
import { DatabaseLoadMoreLoader } from "../../Common/DatabaseLoadMoreLoader/DatabaseLoadMoreLoader";

interface PromptsList {
    promptsQuery: any,
    navbarMobileHandle: any,
    databaseListContainerRef: RefObject<HTMLDivElement>
}

export function PromptsList({ promptsQuery, navbarMobileHandle, databaseListContainerRef }: PromptsList) {
    const { ref, entry } = useIntersection({
        root: databaseListContainerRef.current,
        threshold: 1,
    });

    const {hasNextPage, fetchNextPage} = promptsQuery;

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry, hasNextPage, fetchNextPage])

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
                                const isTarget = index === page.length / 2;

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
                <DatabaseLoadMoreLoader itemQuery={promptsQuery} />
            </Stack>
        </Box>
    )
}