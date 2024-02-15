import { FC, useEffect, useState } from "react";
import { Button, Card, Grid, Group, Modal, SegmentedControl, Stack, Title } from "@mantine/core";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";
import { LanguagesFilter } from "../../components/Filters/LanguagesFilter/LanguagesFilter";
import { RepositoriesFilter } from "../../components/Filters/RepositoriesFilter/RepositoriesFilter";
import { TechnologiesFilter } from "../../components/Filters/TechnologiesFilter/TechnologiesFilter";
import { SearchTermFilter } from "../../components/Filters/SearchTermFilter/SearchTermFilter";
import { PromptsList } from "../../components/Database/Prompts/PromptsList/PromptsList";
import { TemplatesList } from "../../components/Database/Templates/TemplatesList/TemplatesList";
import { ModifiersList } from "../../components/Database/Modifiers/ModifiersList/ModifiersList";
import { useDisclosure } from "@mantine/hooks";
import { usePromptsQuery } from "../../api/promptsApi";
import { useTemplatesQuery } from "../../api/templatesApi";
import { useModifiersQuery } from "../../api/modifiersApi";
import { usePublicDatabaseFiltersQuery } from "../../api/filtersApi";
import { IconDatabase, IconSparkles, IconTemplate } from "@tabler/icons-react";
import { SelectedFilters } from "../../models/SelectedFilters";
import { FlexRow } from "../../components/UI/Layout";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import classes from './PublicDatabasePanel.module.css';

const PublicDatabasePanel: FC = () => {
    // Current user
    const [
        user,
        selectedTemplates,
        selectedModifiers,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedTemplates,
        state.selectedModifiers,
    ]));

    // Modal Handle
    const [opened, { open, close }] = useDisclosure(false);

    // Filters
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(new SelectedFilters());
    const [selectedDatabaseType, setSelectedDatabaseType] = useState<SelectedDatabaseType>(new SelectedDatabaseType());

    // Queries
    const selectedFiltersQuery = usePublicDatabaseFiltersQuery(user);
    const promptsQuery = usePromptsQuery(user.id, selectedFilters);
    const templatesQuery = useTemplatesQuery(user.id, selectedFilters);
    const modifiersQuery = useModifiersQuery(user.id, selectedFilters);

    // Pre select all Filters
    useEffect(() => {
        if (selectedFilters.isEmpty && selectedFiltersQuery.data) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(selectedFiltersQuery.data);
            setSelectedFilters(newSelectedFilters);
        }
    }, [selectedFilters, selectedFiltersQuery]);

    return (
        <>
            <Modal opened={opened} onClose={close} size={"75%"} title="Database">
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 3 }}>
                        <Card>

                            <Stack>
                                <Title order={5}>Filters</Title>

                                <SegmentedControl
                                    className={classes.typeSwitcher}
                                    size="xs"
                                    color="blue"
                                    fullWidth
                                    value={selectedDatabaseType.type}
                                    onChange={type => setSelectedDatabaseType(new SelectedDatabaseType(type as Type))}
                                    data={[
                                        { label: 'Promps', value: Type.PROMPT },
                                        { label: 'Templates', value: Type.TEMPLATE },
                                        { label: 'Modifiers', value: Type.MODIFIER },
                                    ]}
                                />

                                <SearchTermFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
                                {
                                    selectedFiltersQuery.data &&
                                    <FlexRow>
                                        <LanguagesFilter
                                            languages={selectedFiltersQuery.data.languages}
                                            selectedFilters={selectedFilters}
                                            setSelectedFilters={setSelectedFilters}
                                        />
                                        <RepositoriesFilter
                                            repositories={selectedFiltersQuery.data.repositories}
                                            selectedFilters={selectedFilters}
                                            setSelectedFilters={setSelectedFilters}
                                        />
                                        <TechnologiesFilter
                                            technologies={selectedFiltersQuery.data.technologies}
                                            selectedFilters={selectedFilters}
                                            setSelectedFilters={setSelectedFilters}
                                        />
                                    </FlexRow>
                                }
                            </Stack>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 9 }}>
                        <Stack>
                            <Card>
                                <Group justify="space-between">
                                    <Title order={5}>{selectedDatabaseType.labelPlural}</Title>

                                    <Group gap={2}>
                                        {
                                            selectedTemplates.length > 0 &&
                                            <Button color="--mantine-color-text" size="xs" variant="transparent" leftSection={<IconTemplate size={18} />}>
                                                {selectedTemplates.length}
                                            </Button>
                                        }
                                        {
                                            selectedModifiers.length > 0 &&
                                            <Button color="--mantine-color-text" size="xs" variant="transparent" leftSection={<IconSparkles size={18} />}>
                                                {selectedModifiers.length}
                                            </Button>
                                        }
                                    </Group>
                                </Group>
                            </Card>
                            {
                                selectedDatabaseType.type === Type.PROMPT &&
                                <PromptsList
                                    promptsQuery={promptsQuery}
                                    navbarMobileHandle={undefined}
                                />
                            }
                            {
                                selectedDatabaseType.type === Type.TEMPLATE &&
                                <TemplatesList
                                    templatesQuery={templatesQuery}
                                />
                            }
                            {
                                selectedDatabaseType.type === Type.MODIFIER &&
                                <ModifiersList
                                    modifiersQuery={modifiersQuery}
                                />
                            }
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Modal>
            <Button
                fullWidth
                color="--mantine-color-text"
                leftSection={<IconDatabase size={16} />}
                variant="transparent"
                onClick={open}
            >
                Database
            </Button>
        </>
    )
}

export default PublicDatabasePanel;