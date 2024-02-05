import { Button, Checkbox, Combobox, Group, ScrollArea, Text, useCombobox } from '@mantine/core';
import { iconChevronDown } from '../../../utils/iconsUtils';
import { SelectedFilters } from '../../../models/SelectedFilters';
import { IconBulb } from '@tabler/icons-react';

interface TechnologiesFilter {
    technologies: { id: number, name: string, slug: string, default: boolean }[],
    selectedFilters: SelectedFilters
    setSelectedFilters: any
}

export function TechnologiesFilter({ technologies, selectedFilters, setSelectedFilters }: TechnologiesFilter) {
    const selectedIds = selectedFilters.technologies_ids.map(id => id.toString());

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const handleValueSelect = (val: string) => {
        const newValue = selectedIds.includes(val) ? selectedIds.filter((v) => v !== val) : [...selectedIds, val];

        setSelectedFilters({
            ...selectedFilters,
            technologies_ids: newValue.map(id => parseInt(id))
        })
    }

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
            <Combobox.DropdownTarget>
                <Group>
                    <Button
                        leftSection={<IconBulb size={14} />}
                        rightSection={iconChevronDown(14)}
                        onClick={() => combobox.toggleDropdown()}
                        variant='transparent'
                        color='var(--mantine-color-text)'
                        px={0}
                    >
                        <Text size='sm'>
                            Technologies ({selectedFilters.technologies_ids.length} / {technologies.length})
                        </Text>
                    </Button>
                </Group>
            </Combobox.DropdownTarget>
            <Combobox.Dropdown>
                <ScrollArea.Autosize type="scroll" mah={200}>

                    {
                        technologies
                            .map((item) => (
                                <Combobox.Option value={item.id.toString()} key={item.id} active={selectedIds.includes(item.id.toString())}>
                                    <Group gap="sm">
                                        <Checkbox
                                            size='sm'
                                            checked={selectedIds.includes(item.id.toString())}
                                            onChange={() => { }}
                                            aria-hidden
                                            tabIndex={-1}
                                            style={{ pointerEvents: 'none' }}
                                        />
                                        <Text size='sm'>
                                            {item.name}
                                        </Text>
                                    </Group>
                                </Combobox.Option>
                            ))
                    }
                </ScrollArea.Autosize>
            </Combobox.Dropdown>
        </Combobox>
    );
}