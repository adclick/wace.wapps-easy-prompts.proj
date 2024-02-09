import { Accordion, Box, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { Modifier } from "../../../../models/Modifier";
import { ModifierCard } from "../ModifierCard/ModifierCard";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";
import { PromptRequest } from "../../../../models/PromptRequest";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { Technology } from "../../../../models/Technology";
import { Provider } from "../../../../models/Provider";
import { DatabaseLoadMoreLoader } from "../../Common/DatabaseLoadMoreLoader/DatabaseLoadMoreLoader";

interface ModifiersList {
    modifiersQuery: any,
    databaseListContainerRef: any
}

export function ModifiersList({ modifiersQuery, databaseListContainerRef }: ModifiersList) {
    const { selectedModifiers, setSelectedModifiers } = useSelectedModifiers();
    const { setSelectedTemplates } = useSelectedTemplates();
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const onChange = async (ids: string[]) => {
        const modifiers: Modifier[] = [];
        modifiersQuery.data.pages.map((page: any) => {
            page.map((modifier: Modifier) => {
                if (ids.includes(modifier.id.toString())) {
                    modifiers.push(modifier);
                }
            })
        });

        // Update userPromptRequest based on the first modifier selected
        if (modifiers.length > 0) {
            const newUserRequest = PromptRequest.clone(userPromptRequest);
            newUserRequest.technology = Technology.clone(modifiers[0].technology);

            if (modifiers[0].provider) {
                newUserRequest.provider = Provider.clone(modifiers[0].provider);
            } else {
                newUserRequest.provider = new Provider();
            }

            setUserPromptRequest(newUserRequest);
        }

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
                                return page.map((modifier: Modifier, index: number) => {
                                    return <ModifierCard
                                        itemRef={undefined}
                                        key={modifier.id}
                                        modifier={modifier}
                                    />;
                                })
                            })
                        }
                    </Accordion>
                </Checkbox.Group>
                <DatabaseLoadMoreLoader itemQuery={modifiersQuery} />
            </Stack>
        </Box>
    )
}