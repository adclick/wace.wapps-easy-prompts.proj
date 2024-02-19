import { Accordion, Box, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { Template } from "../../../../models/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useState } from "react";
import { Technology } from "../../../../models/Technology";
import { Provider } from "../../../../models/Provider";
import { DatabaseLoadMoreLoader } from "../../Common/DatabaseLoadMoreLoader/DatabaseLoadMoreLoader";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";
import { Thread } from "../../../../models/Thread";

interface TemplatesList {
    templatesQuery: any,
}

export function TemplatesList({ templatesQuery }: TemplatesList) {
    const [
        selectedTemplates,
        nextThread,
        setSelectedTemplates,
        setSelectedModifiers,
        setNextThread,
    ] = useStore(useShallow(state => [
        state.selectedTemplates,
        state.nextThread,
        state.setSelectedTemplates,
        state.setSelectedModifiers,
        state.setNextThread
    ]));

    const [value, setValue] = useState<string | null>(null);

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
            const newNextThread = Thread.clone(nextThread);
            newNextThread.prompt.technology = Technology.clone(templates[0].technology);

            if (templates[0].provider) {
                newNextThread.prompt.provider = Provider.clone(templates[0].provider);
            } else {
                newNextThread.prompt.provider = new Provider();
            }

            setNextThread(newNextThread);
        }

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