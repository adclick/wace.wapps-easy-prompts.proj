import { useState } from 'react';
import { Checkbox, Combobox, Group, Pill, PillsInput, ScrollArea, Stack, Text, useCombobox } from '@mantine/core';
import { iconChevronDown } from '../../../utils/iconsUtils';
import { usePromptMode } from '../../../context/PromptModeContext';
import { getPromptModeColor } from '../../../model/PromptMode';
import { SelectedFilters } from '../../../model/SelectedFilters';

interface TechnologiesFilter {
    technologies: { id: number, name: string, slug: string, default: boolean }[],
    selectedFilters: SelectedFilters
    setSelectedFilters: any
}

export function TechnologiesFilter({ technologies, selectedFilters, setSelectedFilters }: TechnologiesFilter) {
    const selectedIds = selectedFilters.technologies_ids.map(id => id.toString());
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
            technologies_ids: newValue.map(id => parseInt(id))
        })

    }

    const selectAll = () => {
        const newValue = technologies.map(l => l.id);

        setSelectedFilters({
            ...selectedFilters,
            technologies_ids: newValue
        })
    }

    const removeAll = () => {
        setSelectedFilters({
            ...selectedFilters,
            technologies_ids: []
        })
    }

    return (
        <Stack gap={"xs"}>
            <Text size='sm'>Technologies</Text>
            <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
                <Combobox.DropdownTarget>
                    <PillsInput size='xs' onClick={() => combobox.openDropdown()}>
                        <Pill.Group>
                            <Combobox.EventsTarget>
                                <PillsInput.Field
                                    onFocus={() => combobox.openDropdown()}
                                    onBlur={() => combobox.closeDropdown()}
                                    value={search}
                                    placeholder="Filter Technologies"
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
                    <ScrollArea.Autosize type="scroll" mah={200}>

                        {
                            technologies
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
                    </ScrollArea.Autosize>
                </Combobox.Dropdown>
            </Combobox>
        </Stack>
    );
}