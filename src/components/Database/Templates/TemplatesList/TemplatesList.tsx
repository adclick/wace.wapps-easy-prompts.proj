import { Accordion, Box, Button, Center, Checkbox, Loader, Radio, Stack } from "@mantine/core";
import { Template } from "../../../../model/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useState } from "react";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { PromptRequest } from "../../../../model/PromptRequest";
import { Technology } from "../../../../model/Technology";
import { Provider } from "../../../../model/Provider";
import { getDefaultProvider } from "../../../../api/providersApi";

interface TemplatesList {
    templatesQuery: any
}

export function TemplatesList({ templatesQuery }: TemplatesList) {
    const { selectedTemplates, setSelectedTemplates } = useSelectedTemplates();
    const { setSelectedModifiers } = useSelectedModifiers();
    const [value, setValue] = useState<string | null>(null);
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const onChange = async (ids: string[]) => {
        const templates: Template[] = [];
        templatesQuery.data.pages.map((page: any) => {
            page.map((template: Template) => {
                if (ids.includes(template.id.toString())) {
                    templates.push(template);


                }
            })
        })

        // Update userPromptRequest based on the first template selected
        if (templates.length > 0) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.technology = Technology.clone(templates[0].technology);
            if (templates[0].provider) {
                newUserRequest.provider = Provider.clone(templates[0].provider);
            } else {
                const provider = await getDefaultProvider(templates[0].technology.id);
                newUserRequest.provider = Provider.clone(provider);
            }
            setUserPromptRequest(newUserRequest);
        }

        setSelectedModifiers([]);
        setSelectedTemplates(templates);
    }

    return (
        <Box>
            {
                templatesQuery.isLoading &&
                <Center mb={"xl"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
                <Checkbox.Group value={selectedTemplates.map(t => t.id.toString())} onChange={onChange}>
                    <Accordion
                        value={value}
                        onChange={setValue}
                        variant="separated"
                        chevron=""
                        styles={{ chevron: { display: "none" } }}
                    >
                        {
                            templatesQuery.data !== undefined &&
                            templatesQuery.data.pages.map((page: any) => {
                                return page.map((template: Template) => {
                                    return <TemplateCard
                                        key={template.id}
                                        template={template}
                                        cardValue={value}
                                    />
                                })
                            })
                        }
                    </Accordion>
                </Checkbox.Group>
                <Button
                    variant="default"
                    size="xs"
                    onClick={() => templatesQuery.fetchNextPage()}
                    disabled={!templatesQuery.hasNextPage || templatesQuery.isFetchingNextPage}
                >
                    {
                        templatesQuery.isFetchingNextPage
                            ? "Loading more..."
                            : templatesQuery.hasNextPage
                                ? "Load More"
                                : "Nothing more to load"
                    }
                </Button>
            </Stack>
        </Box>
    )
}