import { Accordion, Box, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { Template } from "../../../../models/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useState } from "react";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { PromptRequest } from "../../../../models/PromptRequest";
import { Technology } from "../../../../models/Technology";
import { Provider } from "../../../../models/Provider";
import { DatabaseLoadMoreLoader } from "../../Common/DatabaseLoadMoreLoader/DatabaseLoadMoreLoader";

interface TemplatesList {
    templatesQuery: any,
    databaseListContainerRef: any
}

export function TemplatesList({ templatesQuery, databaseListContainerRef }: TemplatesList) {
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
                newUserRequest.provider = new Provider();
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
                                return page.map((template: Template, index: number) => {

                                    return <TemplateCard
                                        itemRef={undefined}
                                        key={template.id}
                                        template={template}
                                    />
                                })
                            })
                        }
                    </Accordion>
                </Checkbox.Group>
                <DatabaseLoadMoreLoader itemQuery={templatesQuery} />
            </Stack>
        </Box>
    )
}