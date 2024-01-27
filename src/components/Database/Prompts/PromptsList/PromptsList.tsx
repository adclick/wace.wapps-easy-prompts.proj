import { Accordion, Box, Button, Center, Loader, Stack } from "@mantine/core";
import { Prompt } from "../../../../model/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";

interface PromptsList {
    promptsQuery: any,
    navbarMobileHandle: any
}

export function PromptsList({ promptsQuery, navbarMobileHandle }: PromptsList) {
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
                            return page.map((prompt: Prompt) => {
                                return <PromptCard
                                    key={prompt.id}
                                    prompt={prompt}
                                    navbarMobileHandle={navbarMobileHandle}
                                />
                            })
                        })

                    }
                </Accordion>
                <Button
                    variant="default"
                    size="xs"
                    onClick={() => promptsQuery.fetchNextPage()}
                    disabled={!promptsQuery.hasNextPage || promptsQuery.isFetchingNextPage}
                >
                    {
                        promptsQuery.isFetchingNextPage
                            ? "Loading more..."
                            : promptsQuery.hasNextPage
                                ? "Load More"
                                : "Nothing more to load"
                    }
                </Button>
            </Stack>
        </Box>
    )
}