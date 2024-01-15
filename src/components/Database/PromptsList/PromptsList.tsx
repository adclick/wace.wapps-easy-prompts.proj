import { Accordion, Box, Center, Loader, Stack } from "@mantine/core";
import { Prompt } from "../../../model/Prompt";
import { PromptCard } from "../PromptCard/PromptCard";

interface PromptsList {
    promptsQuery: any
}

export function PromptsList({ promptsQuery }: PromptsList) {
    return (
        <Box>
            {
                promptsQuery.isFetching &&
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
                        promptsQuery.data.map((prompt: Prompt) => {
                            return <PromptCard key={prompt.id} prompt={prompt} />
                        })
                    }
                </Accordion>
            </Stack>
        </Box>
    )
}