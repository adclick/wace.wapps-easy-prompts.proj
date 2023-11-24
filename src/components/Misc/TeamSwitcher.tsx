import { Button, Menu, Select, rem } from "@mantine/core";

export function TeamSwitcher() {
    return (
        <Select
            w={"100%"}
            data={[
                { label: "Global", value: "global" },
                { label: "Wace", value: "wace" },
            ]}
            value={"wace"}
            variant="unstyled"
            size="md"
            maxDropdownHeight={500}
        />
    )
}