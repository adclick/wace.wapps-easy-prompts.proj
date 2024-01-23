import { Accordion, Box, Button, Center, Checkbox, Loader, Radio, Stack } from "@mantine/core";
import { Template } from "../../../../model/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useSelectedTemplate } from "../../../../context/SelectedTemplateContext";
import { useState } from "react";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";

interface TemplatesList {
    templatesQuery: any
}

export function TemplatesList({ templatesQuery }: TemplatesList) {
    const { selectedTemplates, setSelectedTemplates } = useSelectedTemplates();
    const [value, setValue] = useState<string | null>(null);


    const onChange = (ids: string[]) => {
        const templates = templatesQuery.data.filter((t: Template) => ids.includes(t.id.toString()));

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
                            templatesQuery.data.map((template: Template) =>
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    cardValue={value}
                                />
                            )
                        }
                    </Accordion>
                </Checkbox.Group>
            </Stack>
        </Box>
    )
}