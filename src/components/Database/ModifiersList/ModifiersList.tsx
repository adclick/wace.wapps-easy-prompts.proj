import { Accordion, Box, Center, Checkbox, CheckboxGroup, Loader, Stack } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { useModifiersSelectedFilters } from "../../../context/PromptsSelectedFiltersContext copy";
import { useModifierssQuery } from "../../../api/modifiersApi";
import { Modifier } from "../../../model/Modifier";
import { useState } from "react";
import { ModifierCard } from "../ModifierCard/ModifierCard";

export function ModifiersList() {
    const { modifiersSelectedFilters } = useModifiersSelectedFilters();
    const { user } = useUser();
    const { isLoading, data } = useModifierssQuery(user.id, modifiersSelectedFilters);
    const [modifiers, setModifiers] = useState<Modifier[]>([]);
    const [value, setValue] = useState<string[]>([]);

    const onChange = (value: string[]) => {
        console.log(value);
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
                <Checkbox.Group value={value} onChange={setValue}>
                    <Accordion variant="separated" chevron="" styles={{
                        chevron: {
                            display: "none"
                        }
                    }}>
                        {
                            data !== undefined &&
                            data.map((modifier: Modifier) => {
                                return (
                                    <ModifierCard key={modifier.id}
                                        modifier={modifier}
                                        modifiers={modifiers}
                                        setModifiers={setModifiers}
                                    />
                                )
                            })
                        }
                    </Accordion>
                </Checkbox.Group>
            </Stack>
        </Box>
    )
}