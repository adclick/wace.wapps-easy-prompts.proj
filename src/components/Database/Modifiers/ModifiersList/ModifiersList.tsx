import { Accordion, Box, Center, Checkbox, Loader, Stack } from "@mantine/core";
import { Modifier } from "../../../../models/Modifier";
import { ModifierCard } from "../ModifierCard/ModifierCard";
import { Technology } from "../../../../models/Technology";
import { Provider } from "../../../../models/Provider";
import { DatabaseLoadMoreLoader } from "../../Common/DatabaseLoadMoreLoader/DatabaseLoadMoreLoader";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";
import { Thread } from "../../../../models/Thread";

interface ModifiersList {
    modifiersQuery: any,
}

export function ModifiersList({ modifiersQuery }: ModifiersList) {
    const [
        selectedModifiers,
        nextThread,
        setSelectedTemplates,
        setSelectedModifiers,
        setNextThread
    ] = useStore(useShallow(state => [
        state.selectedModifiers,
        state.nextThread,
        state.setSelectedTemplates,
        state.setSelectedModifiers,
        state.setNextThread
    ]));

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
            const newNextThread = Thread.clone(nextThread);
            newNextThread.technology = Technology.clone(modifiers[0].technology);

            if (modifiers[0].provider) {
                newNextThread.provider = Provider.clone(modifiers[0].provider);
            } else {
                newNextThread.provider = new Provider();
            }

            setNextThread(newNextThread);
        }

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