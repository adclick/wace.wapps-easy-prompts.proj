import { Accordion, Box, Button, Center, Loader, Paper, Stack, Text } from "@mantine/core";
import { Prompt } from "../../../../models/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";
import { useIntersection } from "@mantine/hooks";
import { RefObject, useEffect } from "react";
import { DatabaseLoadMoreLoader } from "../../Common/DatabaseLoadMoreLoader/DatabaseLoadMoreLoader";

interface PromptsList {
    promptsQuery: any,
    navbarMobileHandle: any,
    databaseListContainerRef: any
}

export function PromptsList({ promptsQuery, navbarMobileHandle, databaseListContainerRef }: PromptsList) {
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
                                return (
                                    <PromptCard
                                        key={prompt.id}
                                        itemRef={undefined}
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