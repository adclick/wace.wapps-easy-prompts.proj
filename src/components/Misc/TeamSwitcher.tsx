import { Button, Menu, Select, rem } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

export function TeamSwitcher() {
    return (
        <Select
            w={"100%"}
            data={[
                {label: "Global", value: "global"},
                {label: "Wace", value: "wace"},
            ]}
            value={"Wace"}
            variant="unstyled"
            size="md"
            maxDropdownHeight={500}
        />
    )
}