import { Accordion, Box, Button, Center, Checkbox, Loader, Radio, Stack } from "@mantine/core";
import { Template } from "../../../model/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useSelectedTemplate } from "../../../context/SelectedTemplateContext";

interface TemplatesList {
    templatesQuery: any
}

export function TemplatesList({ templatesQuery }: TemplatesList) {
    const { setSelectedTemplate } = useSelectedTemplate();


    const onChange = (id: string) => {
        const template = templatesQuery.data.find((m: Template) => m.id === parseInt(id));

        setSelectedTemplate(template);
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
                <Radio.Group onChange={onChange}>
                    <Accordion variant="separated" chevron="" styles={{ chevron: { display: "none" } }}>
                        {
                            templatesQuery.data !== undefined &&
                            templatesQuery.data.map((template: Template) => <TemplateCard key={template.id} template={template} />)
                        }
                    </Accordion>
                </Radio.Group>
            </Stack>
        </Box>
    )
}