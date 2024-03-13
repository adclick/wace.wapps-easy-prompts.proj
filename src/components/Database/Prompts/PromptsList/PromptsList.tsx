import { Accordion, Box, Center, Loader, Stack } from "@mantine/core";
import { Prompt } from "../../../../models/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";
import { DatabaseLoadMoreLoader } from "../../Common/DatabaseLoadMoreLoader/DatabaseLoadMoreLoader";

interface PromptsList {
    promptsQuery: any,
    navbarMobileHandle: any,
}

export function PromptsList({ promptsQuery, navbarMobileHandle }: PromptsList) {
    return (
        <>
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
                                return (
                                    <PromptCard
                                        key={prompt.uuid}
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
        </>
    )
}