import { Select } from "@mantine/core";

export function TeamSwitcher() {
    return (
        <Select
            w={"100%"}
            data={[
                { group: 'Options', items: ['Create new Team', "Manage Teams"] },
                { group: 'Teams', items: ['Global', 'Wace'] },
              ]}
            value={"Wace"}
            variant="unstyled"
            size="md"
            maxDropdownHeight={500}
        />
    )
}