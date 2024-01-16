import { Accordion, Checkbox, Radio, Stack } from "@mantine/core";
import { Template } from "../../../model/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useSelectedTemplate } from "../../../context/SelectedTemplateContext";

interface TemplatesList {
    templatesQuery: any
}

export function TemplatesList({ templatesQuery }: TemplatesList) {
    const { selectedTemplate, setSelectedTemplate } = useSelectedTemplate();


    const onChange = (id: string) => {
        const template = templatesQuery.data.filter((m: Template) => m.id === parseInt(id));

        setSelectedTemplate(template);
    }

    return (
        <Stack>
            <Radio.Group onChange={onChange}>
                <Accordion variant="separated" chevron="" styles={{ chevron: { display: "none" } }}>
                    {
                        templatesQuery.data !== undefined &&
                        templatesQuery.data.map((template: Template) => <TemplateCard key={template.id} template={template} />)
                    }
                </Accordion>
            </Radio.Group>
        </Stack>
    )
}