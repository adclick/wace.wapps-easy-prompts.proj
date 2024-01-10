import { Accordion, Box, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { useModifiersSelectedFilters } from "../../../context/PromptsSelectedFiltersContext copy";
import { useModifierssQuery } from "../../../api/modifiersApi";
import { Modifier } from "../../../model/Modifier";
import { ModifierCard } from "../ModifierCard/ModifierCard";
import { useModifiersSelected } from "../../../context/ModifiersSelectedContext";

export function ModifiersList() {
    const { user } = useUser();
    const { modifiersSelectedFilters } = useModifiersSelectedFilters();
    const { isLoading, data } = useModifierssQuery(user.id, modifiersSelectedFilters);
    const { modifiersSelected, setModifiersSelected } = useModifiersSelected();

    const onChange = (ids: string[]) => {
        const modifiers = data.filter((m: Modifier) => ids.includes(m.id.toString()));

        setModifiersSelected(modifiers);
    }

    console.log(modifiersSelected);

    return (
        <Box>
            {
                isLoading &&
                <Center mb={"xl"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
                <Checkbox.Group value={modifiersSelected.map(m => m.id.toString())} onChange={onChange}>
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