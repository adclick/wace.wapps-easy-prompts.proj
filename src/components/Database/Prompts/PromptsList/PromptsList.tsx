import { Accordion, Box, Button, Center, Loader, Paper, Stack } from "@mantine/core";
import { Prompt } from "../../../../model/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";

interface PromptsList {
    promptsQuery: any,
    navbarMobileHandle: any,
    itemRef: any,
    entry: any
}

export function PromptsList({ promptsQuery, navbarMobileHandle, itemRef, entry }: PromptsList) {



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
                            const total = promptsQuery.data.pages.length * 10;
                            console.log("total", total);

                            return page.map((prompt: Prompt, index: number) => {
                                let r = itemRef;

                                if (index !== page.length - 1) {
                                    r = null;
                                }

                                console.log(r)

                                if (index === page.length - 1) {
                                    if (entry?.isIntersecting) {
                                        console.log("intersected on " + index);
                                        //promptsQuery.fetchNextPage();
                                    }
                                }

                                return (
                                        <PromptCard
                                            key={prompt.id}
                                            itemRef={r}
                                            prompt={prompt}
                                            navbarMobileHandle={navbarMobileHandle}
                                        />
                                )
                            })
                        })

                    }
                </Accordion>
                {/* <DatabaseLoadMoreButton itemQuery={promptsQuery} /> */}
            </Stack>
        </Box>
    )
}