import { Button, Checkbox, Combobox, Group, Text, useCombobox } from '@mantine/core';
import { iconChevronDown } from '../../../utils/iconsUtils';
import { SelectedFilters } from '../../../models/SelectedFilters';
import { IconLanguage } from '@tabler/icons-react';

interface LanguagesFilter {
    languages: { id: number, uuid: string, name: string, slug: string, default: boolean }[],
    selectedFilters: SelectedFilters,
    setSelectedFilters: any
}

export function LanguagesFilter({ languages, selectedFilters, setSelectedFilters }: LanguagesFilter) {
    const selectedIds = selectedFilters.languages_ids;

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),

    });

    const handleValueSelect = (val: string) => {
        const newValue = selectedIds.includes(val) ? selectedIds.filter((v) => v !== val) : [...selectedIds, val];

        setSelectedFilters({
            ...selectedFilters,
            languages_ids: newValue
        })
    }

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <Group>
                    <Button
                        leftSection={<IconLanguage size={14} />}
                        rightSection={iconChevronDown(14)}
                        onClick={() => combobox.toggleDropdown()}
                        variant='transparent'
                        color='var(--mantine-color-text)'
                        px={0}
                    >
                        <Text size='sm'>
                            Languages ({selectedFilters.languages_ids.length} / {languages.length})
                        </Text>
                    </Button>
                </Group>
            </Combobox.DropdownTarget>
            <Combobox.Dropdown>
                {
                    languages
                        .map((item) => (
                            <Combobox.Option value={item.uuid} key={item.uuid} active={selectedIds.includes(item.uuid)}>
                                <Group gap="sm">
                                    <Checkbox
                                        size='sm'
                                        checked={selectedIds.includes(item.uuid)}
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