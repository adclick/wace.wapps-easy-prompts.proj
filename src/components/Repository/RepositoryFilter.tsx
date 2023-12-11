import { useState } from 'react';
import { Text, Stack, Title, PillsInput, Pill, Input, Combobox, Group, useCombobox, Checkbox } from '@mantine/core';

const groceries = ['My Repository', 'Wace'];

export function RepositoryFilter() {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [value, setValue] = useState<string[]>([]);

    const handleValueSelect = (val: string) =>
        setValue((current) =>
            current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
        );

    const handleValueRemove = (val: string) =>
        setValue((current) => current.filter((v) => v !== val));

    const values = value.map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
            {item}
        </Pill>
    ));

    const options = groceries.map((item) => (
        <Combobox.Option value={item} key={item} active={value.includes(item)}>
            <Group gap="sm">
                <Checkbox
                    checked={value.includes(item)}
                    onChange={() => { }}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                    radius={"sm"}
                    size='xs'
                />
                <span>{item}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false} >
            <Combobox.DropdownTarget>
                <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
                    <Pill.Group>
                        {values.length > 0 ? (
                            <Text size='sm'>{`${values.length} repositories   selected`}</Text>
                        ) : (
                            <Input.Placeholder>Pick one or more values</Input.Placeholder>
                        )}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                type="hidden"
                                onBlur={() => combobox.closeDropdown()}
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace') {
                                        event.preventDefault();
                                        handleValueRemove(value[value.length - 1]);
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}