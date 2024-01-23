import { Accordion, Box, Button, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { Modifier } from "../../../../model/Modifier";
import { ModifierCard } from "../ModifierCard/ModifierCard";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";

interface ModifiersList {
    modifiersQuery: any
}

export function ModifiersList({ modifiersQuery }: ModifiersList) {
    const { selectedModifiers, setSelectedModifiers } = useSelectedModifiers();
    const { setSelectedTemplates } = useSelectedTemplates();

    const onChange = (ids: string[]) => {
        const modifiers: Modifier[] = [];
        modifiersQuery.data.pages.map((page: any) => {
            page.map((modifier: Modifier) => {
                if (ids.includes(modifier.id.toString())) {
                    modifiers.push(modifier);
                }
            })
        })

        setSelectedTemplates([]);
        setSelectedModifiers(modifiers);
    }

    return (
        <Box>
            {
                modifiersQuery.isLoading &&
                <Center mb={"xl"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
                <Checkbox.Group value={selectedModifiers.map(m => m.id.toString())} onChange={onChange}>
                    <Accordion variant="separated" chevron="" styles={{ chevron: { display: "none" } }}>
                        {
                            modifiersQuery.data !== undefined &&
                            modifiersQuery.data.pages.map((page: any) => {
                                return page.map((modifier: Modifier) => {
                                    return <ModifierCard key={modifier.id} modifier={modifier} />;
                                })
                            })
                        }
                    </Accordion>
                </Checkbox.Group>
                <Button
                    variant="default"
                    size="xs"
                    onClick={() => modifiersQuery.fetchNextPage()}
                    disabled={!modifiersQuery.hasNextPage || modifiersQuery.isFetchingNextPage}
                >
                    {
                        modifiersQuery.isFetchingNextPage
                            ? "Loading more..."
                            : modifiersQuery.hasNextPage
                                ? "Load More"
                                : "Nothing more to load"
                    }
                </Button>
            </Stack>
        </Box>
    )
}