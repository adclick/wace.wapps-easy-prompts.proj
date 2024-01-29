import { Accordion, Box, Button, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { Modifier } from "../../../../model/Modifier";
import { ModifierCard } from "../ModifierCard/ModifierCard";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";
import { useSelectedTemplates } from "../../../../context/SelectedTemplatesContext";
import { PromptRequest } from "../../../../model/PromptRequest";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { Technology } from "../../../../model/Technology";
import { Provider } from "../../../../model/Provider";
import { getDefaultProvider, useDefaultProviderQuery, useProvidersQuery } from "../../../../api/providersApi";
import { useEffect } from "react";
import { DatabaseLoadMoreButton } from "../../Common/DatabaseLoadMoreButton/DatabaseLoadMoreButton";

interface ModifiersList {
    modifiersQuery: any
}

export function ModifiersList({ modifiersQuery }: ModifiersList) {
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
                                return page.map((modifier: Modifier) => {
                                    return <ModifierCard key={modifier.id} modifier={modifier} />;
                                })
                            })
                        }
                    </Accordion>
                </Checkbox.Group>
                <DatabaseLoadMoreButton itemQuery={modifiersQuery} />
            </Stack>
        </Box>
    )
}