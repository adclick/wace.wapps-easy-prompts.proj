import { Select } from "@mantine/core";

export function TeamSwitcher() {
    return (
        <Select
            data={[
                { label: "Wace", value: "wace" }
            ]}
            value={"wace"}
            variant="unstyled"
        />
    )
}