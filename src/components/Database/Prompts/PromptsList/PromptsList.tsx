import { Accordion, Box, Button, Center, Loader, Paper, Stack, Text } from "@mantine/core";
import { Prompt } from "../../../../model/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";

interface PromptsList {
    promptsQuery: any,
    navbarMobileHandle: any,
    itemRef: any,
    entry: any
}

export function PromptsList({ promptsQuery, navbarMobileHandle, itemRef, entry }: PromptsList) {
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
                                        itemRef={isTarget ? itemRef : undefined}
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