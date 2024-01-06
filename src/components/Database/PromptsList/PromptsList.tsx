import { Accordion, Box, Center, Loader, Stack } from "@mantine/core"
import { usePromptsQuery } from "../../../api/promptsApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { Prompt } from "../../../model/Prompt";
import { useUser } from "../../../context/UserContext";
import { PromptCard } from "../PromptCard/PromptCard";
import { usePromptsSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";
import { useState } from "react";

export function PromptsList() {
    const { selectedFilters } = useSelectedFilters();
    const {promptsSelectedFilters} = usePromptsSelectedFilters();
    const { user } = useUser();
    const { isLoading, data } = usePromptsQuery(user.id, promptsSelectedFilters);
    const [prompts, setPrompts] = useState<Prompt[]>([]);


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
                        data.map((prompt: Prompt) => {
                            return (
                                <PromptCard key={prompt.id}
                                    prompt={prompt}
                                    prompts={prompts}
                                    setPrompts={setPrompts}
                                />
                            )
                        })
                    }
                </Accordion>
            </Stack>
        </Box>
    )
}