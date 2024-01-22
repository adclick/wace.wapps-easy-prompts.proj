import { Accordion, Box, Button, Center, Checkbox, Loader, Radio, Stack } from "@mantine/core";
import { Template } from "../../../../model/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useSelectedTemplate } from "../../../../context/SelectedTemplateContext";
import { useState } from "react";

interface TemplatesList {
    templatesQuery: any
}

export function TemplatesList({ templatesQuery }: TemplatesList) {
    const { selectedTemplate, setSelectedTemplate } = useSelectedTemplate();
    const [value, setValue] = useState<string|null>(null);

    return (
        <Box>
            {
                templatesQuery.isLoading &&
                <Center mb={"xl"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
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
            </Stack>
        </Box>
    )
}