import { useState } from 'react';
import { Button, Checkbox, Combobox, Group, Pill, PillsInput, Stack, Text, Title, useCombobox } from '@mantine/core';
import { TemplatesSelectedFilters } from '../../../model/TemplatesSelectedFilters';
import { PromptsSelectedFilters } from '../../../model/PromptsSelectedFilters';
import { ModifiersSelectedFilters } from '../../../model/ModifiersSelectedFilters';
import { iconChevronDown } from '../../../utils/iconsUtils';
import { usePromptMode } from '../../../context/PromptModeContext';
import { getPromptModeColor } from '../../../model/PromptMode';

interface RepositoriesFilter {
    repositories: { id: number, name: string, slug: string, default: boolean }[],
    selectedFilters: PromptsSelectedFilters | TemplatesSelectedFilters | ModifiersSelectedFilters,
    setSelectedFilters: any
}

export function RepositoriesFilter({ repositories, selectedFilters, setSelectedFilters }: RepositoriesFilter) {
    const selectedIds = selectedFilters.repositories_ids.map(id => id.toString());
    const {promptMode} = usePromptMode();

    const color = getPromptModeColor(promptMode);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');

    const handleValueSelect = (val: string) => {
        const newValue = selectedIds.includes(val) ? selectedIds.filter((v) => v !== val) : [...selectedIds, val];

        setSelectedFilters({
            ...selectedFilters,
            repositories_ids: newValue.map(id => parseInt(id))
        })

    }

    const selectAll = () => {
        const newValue = repositories.map(l => l.id);

        setSelectedFilters({
            ...selectedFilters,
            repositories_ids: newValue
        })
    }

    return (
        <Stack gap={"xs"}>
            <Text size='sm'>Repositories</Text>
            <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
                <Combobox.DropdownTarget>
                    <PillsInput size='xs' onClick={() => combobox.openDropdown()}>
                        <Pill.Group>
                            {
                                selectedIds.length > 0
                                    ? <Button
                                        size='compact-xs'
                                        variant='default'
                                    >
                                        {selectedIds.length} selected
                                    </Button>
                                    :
                                    <Button onClick={selectAll} size='compact-xs' variant='default'>
                                        Select all
                                    </Button>
                            }
                            <Combobox.EventsTarget>
                                <PillsInput.Field
                                    onFocus={() => combobox.openDropdown()}
                                    onBlur={() => combobox.closeDropdown()}
                                    value={search}
                                    placeholder="Filter Repositories"
                                    onChange={(event) => {
                                        combobox.updateSelectedOptionIndex();
                                        setSearch(event.currentTarget.value);
                                    }}
                                />
                            </Combobox.EventsTarget>
                            {iconChevronDown("xs")}
                        </Pill.Group>
                    </PillsInput>
                </Combobox.DropdownTarget>
                <Combobox.Dropdown>
                    {
                        repositories
                            .filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase()))
                            .map((item) => (
                                <Combobox.Option value={item.id.toString()} key={item.id} active={selectedIds.includes(item.id.toString())}>
                                    <Group gap="sm">
                                        <Checkbox
                                            size='xs'
                                            checked={selectedIds.includes(item.id.toString())}
                                            onChange={() => { }}
                                            aria-hidden
                                            color={color}
                                            tabIndex={-1}
                                            style={{ pointerEvents: 'none' }}
                                        />
                                        <Text size='xs'>
                                            {item.name}
                                        </Text>
                                    </Group>
                                </Combobox.Option>
                            ))
                    }
                </Combobox.Dropdown>
            </Combobox>
        </Stack>
    );
}