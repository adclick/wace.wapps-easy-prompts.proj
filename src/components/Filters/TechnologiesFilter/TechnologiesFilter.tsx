import { useState } from 'react';
import { ActionIcon, Button, Checkbox, Combobox, Group, Pill, PillsInput, ScrollArea, Stack, Text, Title, useCombobox } from '@mantine/core';
import { TemplatesSelectedFilters } from '../../../model/TemplatesSelectedFilters';
import { PromptsSelectedFilters } from '../../../model/PromptsSelectedFilters';
import { IconPlus, IconTrack, IconTrash, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

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
        <Stack>
            <Title order={5}>Technologies</Title>

            <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
                <Combobox.DropdownTarget>
                    <PillsInput onClick={() => combobox.openDropdown()}>
                        <Pill.Group>
                            {
                                selectedIds.length > 0
                                    ? <Button
                                        size='compact-xs'
                                        variant='transparent'
                                        // leftSection={<IconX size={14} />}
                                        // onClick={removeAll}
                                    >
                                        {selectedIds.length} selected
                                    </Button>
                                    :
                                    <Button onClick={selectAll} size='compact-xs' variant='light'>
                                        Add all
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
                        </Pill.Group>
                    </PillsInput>
                </Combobox.DropdownTarget>
                <Combobox.Dropdown>
                    <Combobox.Header>
                        <Button onClick={removeAll}>Remove all</Button>
                    </Combobox.Header>
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