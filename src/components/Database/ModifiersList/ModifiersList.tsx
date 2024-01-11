import { Accordion, Box, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { useModifiersSelectedFilters } from "../../../context/PromptsSelectedFiltersContext";
import { useModifierssQuery } from "../../../api/modifiersApi";
import { Modifier } from "../../../model/Modifier";
import { ModifierCard } from "../ModifierCard/ModifierCard";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";

export function ModifiersList() {
    const { user } = useUser();
    const { modifiersSelectedFilters } = useModifiersSelectedFilters();
    const { isLoading, data } = useModifierssQuery(user.id, modifiersSelectedFilters);
    const {selectedModifiers, setSelectedModifiers} = useSelectedModifiers();

    const onChange = (ids: string[]) => {
        const modifiers = data.filter((m: Modifier) => ids.includes(m.id.toString()));

        setSelectedModifiers(modifiers);
    }

    return (
        <Box>
            {
                isLoading &&
                <Center mb={"xl"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
                <Checkbox.Group value={selectedModifiers.map(m => m.id.toString())} onChange={onChange}>
                    <Accordion variant="separated" chevron="" styles={{ chevron: { display: "none" } }}>
                        {
                            data !== undefined &&
                            data.map((modifier: Modifier) => <ModifierCard key={modifier.id} modifier={modifier} />)
                        }
                    </Accordion>
                </Checkbox.Group>
            </Stack>
        </Box>
    )
}