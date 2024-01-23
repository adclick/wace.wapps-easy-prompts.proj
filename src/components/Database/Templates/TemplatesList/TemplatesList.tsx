import { Accordion, Box, Button, Center, Checkbox, Loader, Radio, Stack } from "@mantine/core";
import { Template } from "../../../../model/Template";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useState } from "react";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";

interface TemplatesList {
    templatesQuery: any
}

export function TemplatesList({ templatesQuery }: TemplatesList) {
    const { selectedTemplates, setSelectedTemplates } = useSelectedTemplates();
    const { setSelectedModifiers } = useSelectedModifiers();
    const [value, setValue] = useState<string | null>(null);

    const onChange = (ids: string[]) => {
        const templates: Template[] = [];
        templatesQuery.data.pages.map((page: any) => {
            page.map((template: Template) => {
                if (ids.includes(template.id.toString())) {
                    templates.push(template);
                }
            })
        })

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