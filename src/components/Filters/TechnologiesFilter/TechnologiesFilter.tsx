import { useState } from 'react';
import { ActionIcon, Button, Checkbox, Combobox, Group, Pill, PillsInput, ScrollArea, Stack, Text, Title, useCombobox } from '@mantine/core';
import { TemplatesSelectedFilters } from '../../../model/TemplatesSelectedFilters';
import { PromptsSelectedFilters } from '../../../model/PromptsSelectedFilters';
import { IconPlus, IconTrack, IconTrash, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { iconChevronDown } from '../../../utils/iconsUtils';

interface TechnologiesFilter {
    technologies: { id: number, name: string, slug: string, default: boolean }[],
    selectedFilters: PromptsSelectedFilters | TemplatesSelectedFilters,
    setSelectedFilters: any
}

export function TechnologiesFilter({ technologies, selectedFilters, setSelectedFilters }: TechnologiesFilter) {
    const selectedIds = selectedFilters.technologies_ids.map(id => id.toString());

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
                                    placeholder="Search"
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