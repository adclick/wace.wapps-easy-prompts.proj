import { Button, Checkbox, Combobox, Group, Pill, PillsInput, Stack, Text, useCombobox } from '@mantine/core';
import { iconChevronDown } from '../../../utils/iconsUtils';
import { SelectedFilters } from '../../../model/SelectedFilters';
import { IconDatabase } from '@tabler/icons-react';

interface RepositoriesFilter {
    repositories: { id: number, name: string, slug: string, default: boolean }[],
    selectedFilters: SelectedFilters,
    setSelectedFilters: any
}

export function RepositoriesFilter({ repositories, selectedFilters, setSelectedFilters }: RepositoriesFilter) {
    const selectedIds = selectedFilters.repositories_ids.map(id => id.toString());

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const handleValueSelect = (val: string) => {
        const newValue = selectedIds.includes(val) ? selectedIds.filter((v) => v !== val) : [...selectedIds, val];

        setSelectedFilters({
            ...selectedFilters,
            repositories_ids: newValue.map(id => parseInt(id))
        })
    }

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
            <Combobox.DropdownTarget>
                <Group>
                    <Button
                        leftSection={<IconDatabase size={14} />}
                        rightSection={iconChevronDown(14)}
                        onClick={() => combobox.toggleDropdown()}
                        variant='transparent'
                        color='var(--mantine-color-text)'
                        px={0}
                    >
                        <Text size='sm'>
                            Repositories ({selectedFilters.repositories_ids.length} / {repositories.length})
                        </Text>
                    </Button>
                </Group>
            </Combobox.DropdownTarget>
            <Combobox.Dropdown>
                {
                    repositories
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
            </Combobox.Dropdown>
        </Combobox>
    );
}