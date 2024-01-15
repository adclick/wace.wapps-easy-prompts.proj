import { Accordion, Box, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { Modifier } from "../../../model/Modifier";
import { ModifierCard } from "../ModifierCard/ModifierCard";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";

interface ModifiersList {
    modifiersQuery: any
}

export function ModifiersList({ modifiersQuery }: ModifiersList) {
    const { selectedModifiers, setSelectedModifiers } = useSelectedModifiers();

    const onChange = (ids: string[]) => {
        const modifiers = modifiersQuery.data.filter((m: Modifier) => ids.includes(m.id.toString()));

        setSelectedModifiers(modifiers);
    }

    return (
        <Box>
            {
                modifiersQuery.isFetching &&
                <Center mb={"xl"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
                <Checkbox.Group value={selectedModifiers.map(m => m.id.toString())} onChange={onChange}>
                    <Accordion variant="separated" chevron="" styles={{ chevron: { display: "none" } }}>
                        {
                            modifiersQuery.data !== undefined &&
                            modifiersQuery.data.map((modifier: Modifier) => <ModifierCard key={modifier.id} modifier={modifier} />)
                        }
                    </Accordion>
                </Checkbox.Group>
            </Stack>
        </Box>
    )
}