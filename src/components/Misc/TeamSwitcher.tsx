import { Select } from "@mantine/core";

export function TeamSwitcher() {
    return (
        <Select
            w={"100%"}
            data={[
                { label: "Wace", value: "wace" }
            ]}
            value={"wace"}
            variant="unstyled"
        />
    )
}