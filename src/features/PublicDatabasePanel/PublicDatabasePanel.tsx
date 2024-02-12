import { FC, useEffect, useState } from "react";
import { Button, Chip, Modal } from "@mantine/core";
import { SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";
import { Size } from "../../utils/uiUtils";
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
import { IconSearch } from "@tabler/icons-react";
import { SelectedFilters } from "../../models/SelectedFilters";
import { Column, Row } from "../../components/UI";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";

const PublicDatabasePanel: FC = () => {
    // Current user
    const [user] = useStore(useShallow(state => [state.user]));

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
            <Modal opened={opened} onClose={close} size={"75%"} title="Public Database">
                <Column gap={Size.xl} >
                    <Row justify="space-between">
                        <Row>
                            <Chip.Group
                                defaultValue={selectedDatabaseType.type}
                                onChange={type => setSelectedDatabaseType(new SelectedDatabaseType(type as Type))}
                                multiple={false}
                            >
                                <Chip value={Type.PROMPT}>Prompts</Chip>
                                <Chip value={Type.TEMPLATE}>Templates</Chip>
                                <Chip value={Type.MODIFIER}>Modifiers</Chip>
                            </Chip.Group>
                        </Row>
                        {
                            selectedFiltersQuery.data &&
                            <Row>
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
                            </Row>
                        }
                    </Row>
                    <SearchTermFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
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
                            databaseListContainerRef={undefined}
                        />
                    }
                    {
                        selectedDatabaseType.type === Type.MODIFIER &&
                        <ModifiersList
                            modifiersQuery={modifiersQuery}
                            databaseListContainerRef={undefined}
                        />
                    }
                </Column >
            </Modal>
            <Button
                fullWidth
                color="gray"
                leftSection={<IconSearch size={16} />}
                variant="transparent"
                onClick={open}
            >
                Public Database
            </Button>
        </>
    )
}

export default PublicDatabasePanel;