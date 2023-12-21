import { Accordion, Box, Center, Loader, Stack } from "@mantine/core"
import { useCraftsQuery } from "../../../api/craftsApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { CraftCard } from "../CraftCard/CraftCard";
import { Craft } from "../../../model/Craft";

interface CraftsContainer {
}

export function CraftsContainer({
}: CraftsContainer) {
    const { selectedFilters } = useSelectedFilters();
    const { isLoading, data } = useCraftsQuery(selectedFilters);

    return (

        <Box>
            {
                isLoading &&
                <Center mb={"xl"}>
                    <Loader type="bars" size={"xs"} />
                </Center>
            }
            <Stack>
                <Accordion variant="separated" chevron="" styles={{
                    chevron: {
                        display: "none"
                    }
                }}>
                    {
                        data !== undefined &&
                        data.data.data.map((item: Craft) => {
                            return (
                                <CraftCard key={item.id}
                                    craft={item}
                                />
                            )
                        })
                    }
                </Accordion>
            </Stack>
        </Box>
    )
}