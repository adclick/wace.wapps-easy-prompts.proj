import { FC, useEffect, useState } from "react";
import { FlexH, FlexV } from "../../components/UI/Layout/Flex";
import { Button, Chip, Modal } from "@mantine/core";
import { Label, LabelPlural, SelectedDatabaseType, Type } from "../../models/SelectedDatabaseType";
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
import { useUser } from "../../context/UserContext";
import { useTemplatesQuery } from "../../api/templatesApi";
import { useModifiersQuery } from "../../api/modifiersApi";
import { useFiltersQuery, usePublicDatabaseFiltersQuery } from "../../api/filtersApi";
import { IconSearch } from "@tabler/icons-react";
import { SelectedFilters } from "../../models/SelectedFilters";

const PublicDatabase: FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { user } = useUser();
    const selectedFiltersQuery = usePublicDatabaseFiltersQuery(user);
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(new SelectedFilters());
    const promptsQuery = usePromptsQuery(user.id, selectedFilters);
    const templatesQuery = useTemplatesQuery(user.id, selectedFilters);
    const modifiersQuery = useModifiersQuery(user.id, selectedFilters);
    const [selectedDatabaseType, setSelectedDatabaseType] = useState<SelectedDatabaseType>(new SelectedDatabaseType());

        
    // Init selectedFilters
    useEffect(() => {
        if (selectedFilters.isEmpty && selectedFiltersQuery.data) {
            const newSelectedFilters = SelectedFilters.buildFromQuery(selectedFiltersQuery.data);
            setSelectedFilters(newSelectedFilters);
        }
    }, [selectedFilters, selectedFiltersQuery]);


    let list = () => {
        switch (selectedDatabaseType.type) {
            case Type.PROMPT:
                return <PromptsList
                    promptsQuery={promptsQuery}
                    navbarMobileHandle={undefined}
                    databaseListContainerRef={undefined}
                />
            case Type.TEMPLATE:
                return <TemplatesList
                    templatesQuery={templatesQuery}
                    databaseListContainerRef={undefined}
                />
            case Type.MODIFIER:
                return <ModifiersList
                    modifiersQuery={modifiersQuery}
                    databaseListContainerRef={undefined}
                />

        }
    }

    const onChangeDatabaseType = (value: string) => {
        const newSelectedDatabaseType = new SelectedDatabaseType();

        switch (value) {
            case Type.PROMPT:
                newSelectedDatabaseType.type = Type.PROMPT;
                newSelectedDatabaseType.label = Label.Prompt;
                newSelectedDatabaseType.labelPlural = LabelPlural.Prompts;
                break;
            case Type.TEMPLATE:
                newSelectedDatabaseType.type = Type.TEMPLATE;
                newSelectedDatabaseType.label = Label.Tempalate;
                newSelectedDatabaseType.labelPlural = LabelPlural.Tempalates;
                break;
            case Type.MODIFIER:
                newSelectedDatabaseType.type = Type.MODIFIER;
                newSelectedDatabaseType.label = Label.Modifier;
                newSelectedDatabaseType.labelPlural = LabelPlural.Modifiers;
                break;

        }

        setSelectedDatabaseType(newSelectedDatabaseType);
    }

    return (
        <>
            <Modal opened={opened} onClose={close} size={"75%"} title="Public Database">
                <FlexV gap={Size.xl} >
                    <FlexH justify="space-between">
                        <FlexH>
                            <Chip.Group defaultValue={selectedDatabaseType.type} onChange={onChangeDatabaseType} multiple={false}>
                                <Chip value={Type.PROMPT}>Prompts</Chip>
                                <Chip value={Type.TEMPLATE}>Templates</Chip>
                                <Chip value={Type.MODIFIER}>Modifiers</Chip>
                            </Chip.Group>
                        </FlexH>

                        {
                            selectedFiltersQuery.data &&
                            <FlexH>
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
                            </FlexH>
                        }
                    </FlexH>
                    <SearchTermFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />

                    {
                        list()
                    }
                </FlexV >
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

export default PublicDatabase;